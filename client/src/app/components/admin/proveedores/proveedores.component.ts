import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; // Ensure MatFormFieldModule is imported if you use mat-form-field in HTML
import { Proveedor } from '../../../models/proveedor/proveedor.model';
import { Servicio } from '../../../models/servicios/servicio';
import { ProveedoresService, GestionarProveedorResponse } from '../../../services/api/proveedores.service';
import { ServiciosService } from '../../../services/api/servicios.service';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { ModalProveedoresComponent } from './modal-proveedores/modal-proveedores.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    AdminHeaderComponent,
    ModalProveedoresComponent
  ]
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  servicios: Servicio[] = [];
  proveedoresFiltrados: Proveedor[] = [];
  textoBusqueda: string = '';
  proveedorSeleccionado: Proveedor | null = null;

  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalProveedor: Partial<Proveedor> = { servicio: { id: null } }; // Initialized for modal

  constructor(
    private proveedoresService: ProveedoresService,
    private serviciosService: ServiciosService
  ) {}

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarServicios();
  }

  cargarProveedores(): void {
    this.proveedoresService.getProveedores().subscribe({
      next: (proveedores) => {
        this.proveedores = proveedores;
        this.proveedoresFiltrados = proveedores;
        if (this.proveedores.length > 0) {
          this.proveedorSeleccionado = this.proveedores[0];
        } else {
          this.proveedorSeleccionado = null;
        }
      },
      error: (err) => console.error('Error al cargar proveedores:', err)
    });
  }

  cargarServicios(): void {
    this.serviciosService.getServicios().subscribe({
      next: (servicios) => {
        this.servicios = servicios;
      },
      error: (err) => console.error('Error al cargar servicios:', err)
    });
  }

  filtrarProveedores(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (texto === '') {
      this.proveedoresFiltrados = this.proveedores;
    } else {
      this.proveedoresFiltrados = this.proveedores.filter((proveedor) => {
        const nombreMatch = proveedor.nombre.toLowerCase().includes(texto);
        const apellidoMatch = proveedor.apellido.toLowerCase().includes(texto);
        const emailMatch = proveedor.email.toLowerCase().includes(texto);

        let servicioMatch = false;
        if (proveedor.servicio && proveedor.servicio.id !== null) {
          const servicioAsociado = this.servicios.find(s => s.id === proveedor.servicio.id);
          if (servicioAsociado && servicioAsociado.nombre) {
            servicioMatch = servicioAsociado.nombre.toLowerCase().includes(texto);
          }
        }
        return nombreMatch || apellidoMatch || emailMatch || servicioMatch;
      });
    }
  }

  selectProveedor(proveedor: Proveedor): void {
    this.proveedorSeleccionado = { ...proveedor };
  }

  addProveedor(): void {
    this.modalModo = 'add';
    this.modalProveedor = { // Initialize with all required fields for a new Proveedor
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      servicio: { id: null }
    };
    this.modalVisible = true;
  }

  editProveedor(): void {
    if (this.proveedorSeleccionado) {
      this.modalModo = 'edit';
      // Ensure all properties, including 'servicio', are correctly copied
      this.modalProveedor = {
        ...this.proveedorSeleccionado,
        servicio: { ...this.proveedorSeleccionado.servicio } // Deep copy servicio object
      };
      this.modalVisible = true;
    }
  }

  deleteProveedor(): void {
    if (this.proveedorSeleccionado) {
      this.modalModo = 'delete';
      this.modalProveedor = { ...this.proveedorSeleccionado };
      this.modalVisible = true;
    }
  }

  guardarModal(proveedorDesdeModal: Proveedor): void {
    this.proveedoresService.gestionarProveedor(this.modalModo, proveedorDesdeModal).subscribe({
      next: (resp: GestionarProveedorResponse) => {
        this.proveedores = resp.proveedores;
        this.proveedoresFiltrados = resp.proveedores;

        let proveedorParaSeleccionar: Proveedor | null = null;
        // If backend returns the specific added/edited proveedor, find it in the updated list
        if (resp.proveedor && resp.proveedor.id) {
          proveedorParaSeleccionar = resp.proveedores.find(p => p.id === resp.proveedor!.id) || null;
        } else if (this.modalModo === 'edit' && proveedorDesdeModal.id) {
          // Fallback for edit if resp.proveedor is not returned but we have the ID from modal
          proveedorParaSeleccionar = resp.proveedores.find(p => p.id === proveedorDesdeModal.id) || null;
        } else if (this.modalModo === 'add') {
            // Attempt to find the newly added provider by unique fields if not returned directly
            // This part might need adjustment based on how unique new providers are before an ID is assigned by backend
            const addedProvider = resp.proveedores.find(p =>
                p.email === proveedorDesdeModal.email &&
                p.nombre === proveedorDesdeModal.nombre &&
                p.apellido === proveedorDesdeModal.apellido
            );
            if(addedProvider) proveedorParaSeleccionar = addedProvider;
        }


        if (proveedorParaSeleccionar) {
          this.proveedorSeleccionado = proveedorParaSeleccionar;
        } else if (resp.proveedores.length > 0) {
          // Default to first item if no specific one found
          this.proveedorSeleccionado = resp.proveedores[0];
        } else {
          this.proveedorSeleccionado = null;
        }
        this.cerrarModal();
      },
      error: (err) => {
        console.error(`Error al ${this.modalModo} proveedor:`, err);
        this.cerrarModal();
      }
    });
  }

  eliminarModal(): void {
    if (this.modalProveedor.id) {
      this.proveedoresService.gestionarProveedor('delete', this.modalProveedor as Proveedor).subscribe({
        next: (resp: GestionarProveedorResponse) => { // Response might not include 'proveedor' for delete
          this.proveedores = resp.proveedores;
          this.proveedoresFiltrados = resp.proveedores;
          this.proveedorSeleccionado = this.proveedores.length > 0 ? this.proveedores[0] : null;
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al eliminar proveedor:', err);
          this.cerrarModal();
        }
      });
    } else {
        console.error('No se puede eliminar proveedor sin ID.');
        this.cerrarModal();
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.modalProveedor = { servicio: { id: null } }; // Reset for next time
  }
}
