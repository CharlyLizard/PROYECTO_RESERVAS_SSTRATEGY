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
    ModalServiciosComponent
  ]
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  categorias: any[] = [];
  servicioSeleccionado: Servicio | null = null;

  // Modal
  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalServicio: any = {};

  constructor(
    private serviciosService: ServiciosService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit() {
    this.categoriasService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.serviciosService.getServicios().subscribe({
      next: (data) => {
        this.servicios = data;
      },
      error: (err) => {
        console.error('Error al cargar los servicios:', err);
      },
    });
  }

  getNombreCategoria(categoriaId: number): string {
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

  guardarModal(servicio: any): void {
    let accion: 'add' | 'edit' | 'delete' = this.modalModo;
    this.serviciosService.gestionarServicio(accion, servicio).subscribe((resp: any) => {
      this.servicios = resp.servicios;
      this.servicioSeleccionado = this.servicios.find(s => s.id === resp.servicio?.id) || null;
      this.cerrarModal();
    });
  }

  eliminarModal(): void {
    this.serviciosService.gestionarServicio('delete', this.modalServicio).subscribe((resp: any) => {
      this.servicios = resp.servicios;
      this.servicioSeleccionado = this.servicios.length > 0 ? this.servicios[0] : null;
      this.cerrarModal();
    });
  }
}
