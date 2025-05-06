import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { Servicio } from '../../../models/servicios/servicio';
import { ServiciosService } from '../../../services/api/servicios.service';
import { CategoriasService } from '../../../services/api/categorias.service';

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
  servicios: Servicio[] = [];
  categorias: any[] = [];

  servicioSeleccionado: Servicio | null = null;

  constructor(
    private serviciosService: ServiciosService,
    private categoriasService: CategoriasService
  ) {}
  ngOnInit() {
    // Cargar categorías
    this.categoriasService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });

    // Cargar servicios
    this.serviciosService.getServicios().subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  getNombreCategoria(categoriaId: number): string {
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Categoría no encontrada';
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

  selectService(servicio: Servicio): void {
    this.servicioSeleccionado = servicio;
  }



  editService(): void {
  }

  deleteService():void{

  }
  addService():void{

  }

}
