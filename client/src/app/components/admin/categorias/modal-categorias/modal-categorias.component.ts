import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../../models/orm/categoria.model';

@Component({
  selector: 'app-modal-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-categorias.component.html',
})
export class ModalCategoriasComponent {
  @Input() visible = false;
  @Input() modo: 'add' | 'edit' | 'delete' = 'add';
  @Input() categoria: Categoria = { nombre: '', descripcion: '' };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Categoria>();
  @Output() delete = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.categoria);
  }

  onDelete() {
    this.delete.emit();
  }

  onClose() {
    this.close.emit();
  }
}
