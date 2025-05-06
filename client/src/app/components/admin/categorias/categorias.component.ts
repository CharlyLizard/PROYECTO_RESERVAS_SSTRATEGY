import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { CategoriasService } from '../../../services/api/categorias.service';
// Importa tu modal
import { ModalCategoriasComponent } from './modal-categorias/modal-categorias.component';

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
  categorias: any[] = [];
  categoriaSeleccionada: any = null;

  // Para el modal
  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalCategoria: any = {};

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

  guardarModal(categoria: any): void {
    let accion: 'add' | 'edit' = this.modalModo === 'delete' ? 'add' : this.modalModo;
    this.categoriasService.gestionarCategoria(accion, categoria).subscribe(resp => {
      // Actualiza la lista según la respuesta del backend
      this.categorias = resp.categorias;
      this.categoriaSeleccionada = this.categorias.find(c => c.id === resp.categoria?.id) || null;
      this.cerrarModal();
    });
  }

  eliminarModal(): void {
    this.categoriasService.gestionarCategoria('delete', this.modalCategoria).subscribe(resp => {
      this.categorias = resp.categorias;
      this.categoriaSeleccionada = this.categorias.length > 0 ? this.categorias[0] : null;
      this.cerrarModal();
    });
  }
}
