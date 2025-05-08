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
import { Categoria } from '../../../models/orm/categoria.model'; // Importa el modelo
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
  categorias: Categoria[] = []; // Usa el tipo Categoria
  categoriasFiltradas: Categoria[] = [];
  textoBusqueda: string = ''; // Texto ingresado en la barra de búsqueda
  categoriaSeleccionada: Categoria | null = null; // Usa el tipo Categoria

  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalCategoria: Categoria = { nombre: '', descripcion: '' }; // Usa el tipo Categoria

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe((categorias: Categoria[]) => { // Tipa la respuesta
      this.categorias = categorias;
      this.categoriasFiltradas = categorias; // Inicialmente, mostrar todas las categorías
    });
  }

  filtrarCategorias(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (texto === '') {
      this.categoriasFiltradas = this.categorias; // Mostrar todas las categorías si no hay texto
    } else {
      this.categoriasFiltradas = this.categorias.filter((categoria) =>
        categoria.nombre.toLowerCase().includes(texto)
      );
    }
  }

  selectCategoria(categoria: Categoria): void { // Tipa el parámetro
    this.categoriaSeleccionada = { ...categoria };
  }

  abrirModalAgregar(): void {
    this.modalModo = 'add';
    this.modalCategoria = { nombre: '', descripcion: '' }; // Objeto Categoria vacío
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
      this.modalCategoria = { ...this.categoriaSeleccionada }; // Solo se necesita el ID para eliminar, pero pasamos el objeto
      this.modalVisible = true;
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  guardarModal(categoria: Categoria): void { // Tipa el parámetro
    let accion: 'add' | 'edit' = this.modalModo === 'delete' ? 'add' : this.modalModo; // La lógica de 'delete' aquí parece incorrecta, debería ser solo 'add' o 'edit'
    if (this.modalModo === 'add' || this.modalModo === 'edit') {
        this.categoriasService.gestionarCategoria(this.modalModo, categoria).subscribe((resp: { categorias: Categoria[], categoria?: Categoria }) => { // Tipa la respuesta
        this.categorias = resp.categorias;
        const categoriaActualizada = resp.categorias.find(c => c.id === (resp.categoria?.id || categoria.id));
        this.selectCategoria(categoriaActualizada || this.categorias[0]);
        this.cerrarModal();
      });
    }
  }

  eliminarModal(): void {
    if (this.modalCategoria.id) { // Asegúrate que hay un ID para eliminar
      this.categoriasService.gestionarCategoria('delete', this.modalCategoria).subscribe((resp: { categorias: Categoria[] }) => { // Tipa la respuesta
        this.categorias = resp.categorias;
        this.categoriaSeleccionada = this.categorias.length > 0 ? { ...this.categorias[0] } : null;
        this.cerrarModal();
      });
    }
  }
}
