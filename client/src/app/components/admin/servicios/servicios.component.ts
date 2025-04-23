import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';

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
    AdminHeaderComponent
  ]
})
export class ServiciosComponent implements OnInit {
  servicios = [
    {
      id: 1,
      nombre: 'Servicio 1',
      duracion: 30,
      precio: 100,
      moneda: 'USD',
      categoria: 'Categoría 1',
      tipo: 'Flexible',
      asistentes: 1,
      ubicacion: 'Oficina',
      color: '#f87171',
      ocultar: false,
      descripcion: 'Descripción del servicio 1',
    },
    {
      id: 2,
      nombre: 'Servicio 2',
      duracion: 60,
      precio: 200,
      moneda: 'EUR',
      categoria: 'Categoría 2',
      tipo: 'Fijo',
      asistentes: 5,
      ubicacion: 'Remoto',
      color: '#34d399',
      ocultar: true,
      descripcion: 'Descripción del servicio 2',
    },
  ];

  servicioSeleccionado: any = null;

  ngOnInit(): void {
    if (this.servicios.length > 0) {
      this.servicioSeleccionado = this.servicios[0];
    }
  }

  selectService(servicio: any): void {
    this.servicioSeleccionado = servicio;
  }

  addService(): void {
    const nuevoServicio = {
      id: this.servicios.length + 1,
      nombre: 'Nuevo Servicio',
      duracion: 0,
      precio: 0,
      moneda: 'USD',
      categoria: '',
      tipo: '',
      asistentes: 1,
      ubicacion: '',
      color: '#f87171',
      ocultar: false,
      descripcion: '',
    };
    this.servicios.push(nuevoServicio);
    this.selectService(nuevoServicio);
  }

  editService(): void {
    // Aquí puedes implementar la lógica de edición si es necesario
  }

  deleteService(): void {
    if (this.servicioSeleccionado) {
      this.servicios = this.servicios.filter(s => s.id !== this.servicioSeleccionado.id);
      this.servicioSeleccionado = this.servicios.length > 0 ? this.servicios[0] : null;
    }
  }
}
