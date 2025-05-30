import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { CategoriasService } from '../../../services/api/categorias.service';

import { ModalCategoriasComponent } from './modal-categorias/modal-categorias.component';
import { Categoria } from '../../../models/orm/categoria.model';
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
    ModalCategoriasComponent
  ],
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = [];
  textoBusqueda: string = '';
  categoriaSeleccionada: Categoria | null = null;

  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalCategoria: Categoria = { nombre: '', descripcion: '' };

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
      this.categoriasFiltradas = categorias;
    });
  }

  filtrarCategorias(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (texto === '') {
      this.categoriasFiltradas = this.categorias;
    } else {
      this.categoriasFiltradas = this.categorias.filter((categoria) =>
        categoria.nombre.toLowerCase().includes(texto)
      );
    }
  }

  selectCategoria(categoria: Categoria): void {
    this.categoriaSeleccionada = { ...categoria };
  }

  abrirModalAgregar(): void {
    this.modalModo = 'add';
    this.modalCategoria = { nombre: '', descripcion: '' };
    this.modalVisible = true;
  }

  abrirModalEditar(): void {
    if (this.categoriaSeleccionada) {
      this.modalModo = 'edit';
      this.modalCategoria = { ...this.categoriaSeleccionada };
      this.modalVisible = true;
    }
  }

  abrirModalEliminar(): void {
    if (this.categoriaSeleccionada) {
      this.modalModo = 'delete';
      this.modalCategoria = { ...this.categoriaSeleccionada };
      this.modalVisible = true;
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  guardarModal(categoria: Categoria): void {
    let accion: 'add' | 'edit' = this.modalModo === 'delete' ? 'add' : this.modalModo;
    if (this.modalModo === 'add' || this.modalModo === 'edit') {
        this.categoriasService.gestionarCategoria(this.modalModo, categoria).subscribe((resp: { categorias: Categoria[], categoria?: Categoria }) => {
        this.categorias = resp.categorias;
        const categoriaActualizada = resp.categorias.find(c => c.id === (resp.categoria?.id || categoria.id));
        this.selectCategoria(categoriaActualizada || this.categorias[0]);
        this.cerrarModal();
      });
    }
  }

  eliminarModal(): void {
    if (this.modalCategoria.id) {
      this.categoriasService.gestionarCategoria('delete', this.modalCategoria).subscribe((resp: { categorias: Categoria[] }) => {
        this.categorias = resp.categorias;
        this.categoriaSeleccionada = this.categorias.length > 0 ? { ...this.categorias[0] } : null;
        this.cerrarModal();
      });
    }
  }
}
