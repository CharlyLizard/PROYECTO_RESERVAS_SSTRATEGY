import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { Servicio } from '../../../models/servicios/servicio';
import { ServiciosService } from '../../../services/api/servicios.service';
import { CategoriasService } from '../../../services/api/categorias.service';
import { ModalServiciosComponent } from './modal-servicios/modal-servicios.component';
import { Categoria } from '../../../models/orm/categoria.model';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    AdminHeaderComponent,
    ModalServiciosComponent,
    FormsModule

  ]
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  categorias: Categoria[] = [];
  serviciosFiltrados: Servicio[] = [];
  textoBusqueda: string = '';
  servicioSeleccionado: Servicio | null = null;

  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalServicio: Partial<Servicio> = {};

  constructor(
    private serviciosService: ServiciosService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit() {
    this.categoriasService.getCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.serviciosService.getServicios().subscribe((servicios) => {
      this.servicios = servicios;
      this.serviciosFiltrados = servicios;
    });
  }

  filtrarServicios(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (texto === '') {
      this.serviciosFiltrados = this.servicios;
    } else {
      this.serviciosFiltrados = this.servicios.filter((servicio) =>
        servicio.nombre.toLowerCase().includes(texto) ||
        (servicio.descripcion && servicio.descripcion.toLowerCase().includes(texto))
      );
    }
  }

  getNombreCategoria(categoriaId: number | null): string {
    if (categoriaId === null) return 'Sin categoría';
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  selectService(servicio: Servicio): void {
    this.servicioSeleccionado = servicio;
  }

  addService(): void {
    this.modalModo = 'add';
    this.modalServicio = {
      nombre: '',
      descripcion: '',
      categoriaId: null,
      duracionMinutos: 30,
      precio: 0,
      moneda: 'EUR',
      tiposDisponibles: 'Flexible',
      numeroAsistentes: 1,
      ubicacion: '',
      color: '#FFFFFF',
      ocultarPublico: false,
      isSelected: false
    };
    this.modalVisible = true;
  }

  selectServicio(servicio: Servicio): void {
    this.servicioSeleccionado = { ...servicio };
  }

  editService(): void {
    if (this.servicioSeleccionado) {
      this.modalModo = 'edit';
      this.modalServicio = { ...this.servicioSeleccionado };
      this.modalVisible = true;
    }
  }

  deleteService(): void {
    if (this.servicioSeleccionado) {
      this.modalModo = 'delete';
      this.modalServicio = { ...this.servicioSeleccionado };
      this.modalVisible = true;
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  guardarModal(servicio: Servicio): void {
    let accion: 'add' | 'edit' | 'delete' = this.modalModo;
     if (this.modalModo === 'add' || this.modalModo === 'edit') {
        this.serviciosService.gestionarServicio(this.modalModo, servicio).subscribe((resp: { servicios: Servicio[], servicio?: Servicio }) => {
        this.servicios = resp.servicios;
        const servicioActualizado = resp.servicios.find(s => s.id === (resp.servicio?.id || servicio.id));
        this.selectService(servicioActualizado || this.servicios[0]);
        this.cerrarModal();
      });
    }
  }

  eliminarModal(): void {
    if (this.modalServicio.id) {
        this.serviciosService.gestionarServicio('delete', this.modalServicio as Servicio).subscribe((resp: { servicios: Servicio[] }) => {
        this.servicios = resp.servicios;
        this.servicioSeleccionado = this.servicios.length > 0 ? this.servicios[0] : null;
        this.cerrarModal();
      });
    }
  }

  seleccionarComoPrincipal(servicio: Servicio): void {
    if (servicio.isSelected) {
      console.log('Este servicio ya es el principal.');
      return;
    }

    this.serviciosService.seleccionarServicioPrincipal(servicio.id).subscribe({
      next: (serviciosActualizados) => {
        this.servicios = serviciosActualizados;
        this.filtrarServicios();

        if (this.servicioSeleccionado && this.servicioSeleccionado.id === servicio.id) {
          const updatedSelected = this.servicios.find(s => s.id === servicio.id);
          this.servicioSeleccionado = updatedSelected ? { ...updatedSelected } : null;
        } else if (!this.servicioSeleccionado && this.servicios.length > 0) {
            this.servicioSeleccionado = this.servicios.find(s => s.isSelected) || this.servicios[0];
        }
        console.log('Servicio principal actualizado con éxito.');
      },
      error: (err) => {
        console.error('Error al seleccionar servicio principal:', err);
      }
    });
  }
}
