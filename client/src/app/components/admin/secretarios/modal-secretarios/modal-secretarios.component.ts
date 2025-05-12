import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Secretario } from '../../../../models/secretario/secretario.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-secretarios',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './modal-secretarios.component.html',
  styleUrls: ['./modal-secretarios.component.css']
})

export class ModalSecretariosComponent {
  @Input() visible = false;
  @Input() modo: 'add' | 'edit' | 'delete' = 'add';
  @Input() secretario: Partial<Secretario> = {};
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Secretario>();
  @Output() delete = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.secretario as Secretario);
  }

  onDelete() {
    this.delete.emit();
  }

  onClose() {
    this.close.emit();
  }
}
