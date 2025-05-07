import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../../models/orm/categoria.model'; // Importa el modelo

@Component({
  selector: 'app-modal-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-categorias.component.html',
  styleUrls: ['./modal-categorias.component.css']
})
export class ModalCategoriasComponent {
  @Input() visible = false;
  @Input() modo: 'add' | 'edit' | 'delete' = 'add';
  @Input() categoria: Categoria = { nombre: '', descripcion: '' }; // Usa el tipo Categoria
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Categoria>(); // Emite tipo Categoria
  @Output() delete = new EventEmitter<void>(); // O EventEmitter<Categoria> si necesitas pasar el objeto

  onSave() {
    this.save.emit(this.categoria);
  }

  onDelete() {
    this.delete.emit(); // O this.delete.emit(this.categoria);
  }

  onClose() {
    this.close.emit();
  }
}
