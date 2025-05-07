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
import { Categoria } from '../../../models/orm/categoria.model'; // Para el array de categorías

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
  categorias: Categoria[] = []; // Usa el tipo Categoria
  servicioSeleccionado: Servicio | null = null;

  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalServicio: Partial<Servicio> = {}; // Usa Partial<Servicio> para el objeto del modal

  constructor(
    private serviciosService: ServiciosService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit() {
    this.categoriasService.getCategorias().subscribe((categorias: Categoria[]) => { // Tipa la respuesta
      this.categorias = categorias;
    });
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.serviciosService.getServicios().subscribe({
      next: (data: Servicio[]) => { // Tipa la respuesta
        this.servicios = data;
      },
      error: (err) => {
        console.error('Error al cargar los servicios:', err);
      },
    });
  }

  getNombreCategoria(categoriaId: number | null): string { // Permite null
    if (categoriaId === null) return 'Sin categoría';
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  selectService(servicio: Servicio): void { // Tipa el parámetro
    this.servicioSeleccionado = servicio;
  }

  addService(): void {
    this.modalModo = 'add';
    this.modalServicio = { // Inicializa con campos de Servicio
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

  guardarModal(servicio: Servicio): void { // Tipa el parámetro
    let accion: 'add' | 'edit' | 'delete' = this.modalModo;
     if (this.modalModo === 'add' || this.modalModo === 'edit') {
        this.serviciosService.gestionarServicio(this.modalModo, servicio).subscribe((resp: { servicios: Servicio[], servicio?: Servicio }) => { // Tipa la respuesta
        this.servicios = resp.servicios;
        const servicioActualizado = resp.servicios.find(s => s.id === (resp.servicio?.id || servicio.id));
        this.selectService(servicioActualizado || this.servicios[0]);
        this.cerrarModal();
      });
    }
  }

  eliminarModal(): void {
    if (this.modalServicio.id) { // Asegúrate que hay un ID para eliminar
        this.serviciosService.gestionarServicio('delete', this.modalServicio as Servicio).subscribe((resp: { servicios: Servicio[] }) => { // Tipa la respuesta
        this.servicios = resp.servicios;
        this.servicioSeleccionado = this.servicios.length > 0 ? this.servicios[0] : null;
        this.cerrarModal();
      });
    }
  }
}
