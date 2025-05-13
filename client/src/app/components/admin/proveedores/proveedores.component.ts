import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Proveedor } from '../../../models/proveedor/proveedor.model';
import { Servicio } from '../../../models/servicios/servicio';
import { ProveedoresService } from '../../../services/api/proveedores.service';
import { ServiciosService } from '../../../services/api/servicios.service';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { ModalProveedoresComponent } from './modal-proveedores/modal-proveedores.component';
import { GestionarProveedorResponse } from '../../../models/proveedor/GestionarProveedorResponse';
import { Secretario } from '../../../models/secretario/secretario.model';
import { SecretarioService } from '../../../services/api/secretario.service';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

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
    ModalProveedoresComponent,
  ],
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  servicios: Servicio[] = [];
  secretarios: Secretario[] = [];
  proveedoresFiltrados: Proveedor[] = [];
  textoBusqueda: string = '';
  proveedorSeleccionado: Proveedor | null = null;

  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalProveedor: Partial<Proveedor> = { servicio: { id: null } };
  secretariosDisponiblesParaModal: Secretario[] = [];

  constructor(
    private proveedoresService: ProveedoresService,
    private serviciosService: ServiciosService,
    private secretarioService: SecretarioService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    forkJoin({
      proveedores: this.proveedoresService.getProveedores(),
      servicios: this.serviciosService.getServicios(),
      secretarios: this.secretarioService.getAllSecretarios()
    }).subscribe(({ proveedores, servicios, secretarios }) => {
      this.proveedores = proveedores;
      this.proveedoresFiltrados = proveedores;
      this.servicios = servicios;
      this.secretarios = secretarios;

      if (this.proveedores.length > 0) {
        this.selectProveedor(this.proveedores[0]);
      }
    }, err => console.error('Error al cargar datos iniciales:', err));
  }

  cargarProveedores(): void {
    this.proveedoresService.getProveedores().subscribe({
      next: (proveedores) => {
        this.proveedores = proveedores;
        this.proveedoresFiltrados = proveedores;
        if (!this.proveedorSeleccionado && proveedores.length > 0) {
          this.selectProveedor(proveedores[0]);
        } else if (this.proveedorSeleccionado) {
          const updatedSelected = proveedores.find(p => p.id === this.proveedorSeleccionado!.id);
          this.proveedorSeleccionado = updatedSelected || (proveedores.length > 0 ? proveedores[0] : null);
        }
      },
      error: (err) => console.error('Error al cargar proveedores:', err),
    });
  }

  cargarServicios(): void {
    this.serviciosService.getServicios().subscribe({
      next: (servicios) => { this.servicios = servicios; },
      error: (err) => console.error('Error al cargar servicios:', err),
    });
  }

  cargarSecretarios(): void {
    this.secretarioService.getAllSecretarios().subscribe({
      next: (secretarios) => { this.secretarios = secretarios; },
      error: (err) => console.error('Error al cargar secretarios:', err),
    });
  }

  filtrarProveedores(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (texto === '') {
      this.proveedoresFiltrados = this.proveedores;
    } else {
      this.proveedoresFiltrados = this.proveedores.filter((proveedor) => {
        const nombreMatch = proveedor.nombre?.toLowerCase().includes(texto);
        const apellidoMatch = proveedor.apellido?.toLowerCase().includes(texto);
        const emailMatch = proveedor.email?.toLowerCase().includes(texto);
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
    this.modalProveedor = {
      nombre: '', apellido: '', nombreUsuario: '', email: '', telefono: '',
      telefonoMovil: '', domicilio: '', ciudad: '', estado: '',
      codigoPostal: '', notas: '', servicio: { id: null },
    };
    this.secretarioService.getSecretariosParaDropdownProveedores(null).subscribe(secretarios => {
      this.secretariosDisponiblesParaModal = secretarios;
      this.modalVisible = true;
    });
  }

  editProveedor(): void {
    if (this.proveedorSeleccionado) {
      this.modalModo = 'edit';
      this.modalProveedor = {
      ...this.proveedorSeleccionado,
      servicio: { id: this.proveedorSeleccionado?.servicio?.id ?? null }
    };
    this.secretarioService.getSecretariosParaDropdownProveedores(this.proveedorSeleccionado.id).subscribe(secretarios => {
      this.secretariosDisponiblesParaModal = secretarios;
      this.modalVisible = true;
    });
    }
  }

  deleteProveedor(): void {
    if (this.proveedorSeleccionado) {
      this.modalModo = 'delete';
      this.modalProveedor = { ...this.proveedorSeleccionado };
      this.modalVisible = true;
    }
  }

  guardarModal(data: { proveedorData: Proveedor, secretarioIdSeleccionado: number | null, secretarioIdOriginal: number | null }): void {
    const { proveedorData, secretarioIdSeleccionado, secretarioIdOriginal } = data;

    this.proveedoresService.gestionarProveedor(this.modalModo, proveedorData).pipe(
      switchMap((resp: GestionarProveedorResponse) => {
        let proveedorGuardadoId: number | undefined;
        if (this.modalModo === 'add' && resp.proveedor?.id) {
            proveedorGuardadoId = resp.proveedor.id;
        } else if (this.modalModo === 'add') {
            const pEncontrado = resp.proveedores.find(p => p.email === proveedorData.email && p.nombre === proveedorData.nombre);
            proveedorGuardadoId = pEncontrado?.id;
        } else { // edit
            proveedorGuardadoId = proveedorData.id;
        }

        if (!proveedorGuardadoId) {
          console.error("No se pudo determinar el ID del proveedor guardado.");
          return of(null);
        }
        
        const observables: Observable<any>[] = [];

        if (secretarioIdOriginal !== null && secretarioIdOriginal !== secretarioIdSeleccionado) {
          observables.push(this.secretarioService.asignarProveedorASecretario(secretarioIdOriginal, null));
        }
        if (secretarioIdSeleccionado !== null && secretarioIdSeleccionado !== secretarioIdOriginal) {
          observables.push(this.secretarioService.asignarProveedorASecretario(secretarioIdSeleccionado, proveedorGuardadoId));
        }
        
        if (observables.length > 0) {
          return forkJoin(observables).pipe(tap(() => this.proveedorSeleccionado = resp.proveedores.find(p => p.id === proveedorGuardadoId) || null));
        }
        this.proveedorSeleccionado = resp.proveedores.find(p => p.id === proveedorGuardadoId) || null;
        return of(null); 
      }),
      catchError(err => {
        console.error(`Error al ${this.modalModo} proveedor o al gestionar secretario:`, err);
        return of(null); 
      })
    ).subscribe(() => {
      this.cargarDatosYActualizarVista();
    });
  }
  
  eliminarModal(): void {
  if (this.modalProveedor.id) {
    const secretarioAsignado = this.secretarios.find(s => s.proveedor?.id === this.modalProveedor.id);
    let desasignarObs: Observable<any> = of(null); // Cambia aquí a Observable<any>
    if (secretarioAsignado) {
      desasignarObs = this.secretarioService.asignarProveedorASecretario(secretarioAsignado.id, null);
    }

    desasignarObs.pipe(
      switchMap(() => this.proveedoresService.gestionarProveedor('delete', this.modalProveedor as Proveedor)),
      catchError(err => {
        console.error('Error al eliminar proveedor o desasignar secretario:', err);
        return of(null);
      })
    ).subscribe(() => {
      this.cargarDatosYActualizarVista();
    });
  } else {
    console.error('No se puede eliminar proveedor sin ID.');
    this.cerrarModal();
  }
}

  private cargarDatosYActualizarVista() {
    forkJoin({
      proveedores: this.proveedoresService.getProveedores(),
      secretarios: this.secretarioService.getAllSecretarios(),
      servicios: this.serviciosService.getServicios()
    }).subscribe(({ proveedores, secretarios, servicios }) => {
      this.proveedores = proveedores;
      this.proveedoresFiltrados = this.textoBusqueda ? this.proveedores.filter(p => this.proveedorCoincideConBusqueda(p, this.textoBusqueda)) : proveedores;
      this.secretarios = secretarios;
      this.servicios = servicios;

      if (this.proveedorSeleccionado && this.proveedorSeleccionado.id) {
        const currentSelected = this.proveedores.find(p => p.id === this.proveedorSeleccionado!.id);
        this.proveedorSeleccionado = currentSelected || (this.proveedores.length > 0 ? this.proveedores[0] : null);
      } else if (this.proveedores.length > 0) {
        this.proveedorSeleccionado = this.proveedores[0];
      } else {
        this.proveedorSeleccionado = null;
      }
      this.cerrarModal();
    }, error => {
        console.error("Error recargando datos", error);
        this.cerrarModal();
    });
  }

  private proveedorCoincideConBusqueda(proveedor: Proveedor, texto: string): boolean {
    const textoLower = texto.toLowerCase().trim();
    if (textoLower === '') return true;
    const nombreMatch = proveedor.nombre?.toLowerCase().includes(textoLower);
    const apellidoMatch = proveedor.apellido?.toLowerCase().includes(textoLower);
    const emailMatch = proveedor.email?.toLowerCase().includes(textoLower);
    let servicioMatch = false;
    if (proveedor.servicio && proveedor.servicio.id !== null) {
      const servicioAsociado = this.servicios.find(s => s.id === proveedor.servicio.id);
      if (servicioAsociado && servicioAsociado.nombre) {
        servicioMatch = servicioAsociado.nombre.toLowerCase().includes(textoLower);
      }
    }
    return !!(nombreMatch || apellidoMatch || emailMatch || servicioMatch);
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.modalProveedor = { servicio: { id: null } };
  }

  getServicioAsignado(): Servicio | null {
    if (!this.proveedorSeleccionado?.servicio?.id) return null;
    return this.servicios.find(s => s.id === this.proveedorSeleccionado!.servicio.id) || null;
  }

  getColorServicioAsignado(): string {
    const servicio = this.getServicioAsignado();
    return servicio?.color || '#439b84';
  }

  getSecretariaAsignada(proveedor: Proveedor | null): Secretario | null {
    if (!proveedor || !this.secretarios.length) {
      return null;
    }
    return this.secretarios.find(s => s.proveedor?.id === proveedor.id) || null;
  }
}