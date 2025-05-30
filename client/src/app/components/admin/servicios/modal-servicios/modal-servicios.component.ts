import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicio } from '../../../../models/servicios/servicio';
import { Categoria } from '../../../../models/orm/categoria.model';

@Component({
  selector: 'app-modal-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-servicios.component.html',
})
export class ModalServiciosComponent {
  @Input() visible = false;
  @Input() modo: 'add' | 'edit' | 'delete' = 'add';
  @Input() servicio: Partial<Servicio> = {};
  @Input() categorias: Categoria[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Servicio>();
  @Output() delete = new EventEmitter<void>();
  onSave() {
    this.save.emit(this.servicio as Servicio);
  }

  onDelete() {
    this.delete.emit();
  }

  onClose() {
    this.close.emit();
  }
}
