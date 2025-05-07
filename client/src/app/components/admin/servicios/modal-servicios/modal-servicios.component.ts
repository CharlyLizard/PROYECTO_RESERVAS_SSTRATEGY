import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicio } from '../../../../models/servicios/servicio'; // Importa el modelo
import { Categoria } from '../../../../models/orm/categoria.model'; // Para el array de categorías

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
  @Input() servicio: Partial<Servicio> = {}; // Usa Partial<Servicio>
  @Input() categorias: Categoria[] = []; // Usa Categoria[]
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Servicio>(); // Emite tipo Servicio
  @Output() delete = new EventEmitter<void>(); // O EventEmitter<Servicio>

  onSave() {
    this.save.emit(this.servicio as Servicio); // Asegúrate de que el objeto cumple con Servicio
  }

  onDelete() {
    this.delete.emit(); // O this.delete.emit(this.servicio as Servicio);
  }

  onClose() {
    this.close.emit();
  }
}
