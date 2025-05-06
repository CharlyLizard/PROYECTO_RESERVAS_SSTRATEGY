import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-servicios.component.html',
  styleUrls: ['./modal-servicios.component.css']
})
export class ModalServiciosComponent {
  @Input() visible = false;
  @Input() modo: 'add' | 'edit' | 'delete' = 'add';
  @Input() servicio: any = {};
  @Input() categorias: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.servicio);
  }

  onDelete() {
    this.delete.emit();
  }

  onClose() {
    this.close.emit();
  }
}
