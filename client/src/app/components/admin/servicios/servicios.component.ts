import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIcon } from '@angular/material/icon';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIcon,
    AdminHeaderComponent,
  ],
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

  monedas = ['USD', 'EUR', 'MXN'];
  categorias = ['Categoría 1', 'Categoría 2', 'Categoría 3'];
  tipos = ['Flexible', 'Fijo'];

  // Colores disponibles
  colores = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#d1d5db'];

  ngOnInit(): void {
    if (this.servicios.length > 0) {
      this.servicioSeleccionado = { ...this.servicios[0] };
    }
  }

  selectService(servicio: any): void {
    this.servicioSeleccionado = { ...servicio };
  }

  addService(): void {
    const nuevoServicio = {
      id: this.servicios.length + 1,
      nombre: '',
      duracion: 0,
      precio: 0,
      moneda: '',
      categoria: '',
      tipo: '',
      asistentes: 1,
      ubicacion: '',
      color: '',
      ocultar: false,
      descripcion: '',
    };
    this.servicios.push(nuevoServicio);
    this.selectService(nuevoServicio);
  }

  editService(): void {
    if (this.servicioSeleccionado) {
      const index = this.servicios.findIndex((s) => s.id === this.servicioSeleccionado.id);
      if (index !== -1) {
        this.servicios[index] = { ...this.servicioSeleccionado };
      }
    }
  }

  deleteService(): void {
    if (this.servicioSeleccionado) {
      this.servicios = this.servicios.filter((s) => s.id !== this.servicioSeleccionado.id);
      this.servicioSeleccionado = this.servicios.length > 0 ? { ...this.servicios[0] } : null;
    }
  }
}
