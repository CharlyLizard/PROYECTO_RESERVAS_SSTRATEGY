import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';

import { CategoriasService } from '../../../services/api/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    AdminHeaderComponent,
  ],
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];
  categoriaSeleccionada: any = null;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      if (this.categorias.length > 0) {
        this.categoriaSeleccionada = { ...this.categorias[0] };
      }
    });
  }

  selectCategoria(categoria: any): void {
    this.categoriaSeleccionada = { ...categoria };
  }

  addCategoria(): void {
    const nuevaCategoria = {
      id: this.categorias.length + 1,
      nombre: '',
      descripcion: '',
    };
    this.categorias.push(nuevaCategoria);
    this.selectCategoria(nuevaCategoria);
  }

  editCategoria(): void {
    if (this.categoriaSeleccionada) {
      const index = this.categorias.findIndex((c) => c.id === this.categoriaSeleccionada.id);
      if (index !== -1) {
        this.categorias[index] = { ...this.categoriaSeleccionada };
      }
    }
  }

  deleteCategoria(): void {
    if (this.categoriaSeleccionada) {
      this.categorias = this.categorias.filter((c) => c.id !== this.categoriaSeleccionada.id);
      this.categoriaSeleccionada = this.categorias.length > 0 ? { ...this.categorias[0] } : null;
    }
  }
}
