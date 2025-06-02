import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { Admin } from '../../../../models/admin/admin.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-administradores',
  imports: [
    FormsModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './modal-administradores.component.html',
  styleUrl: './modal-administradores.component.css'
})
export class ModalAdministradoresComponent {
  @Input() visible = false;
  @Input() modo: 'add' | 'edit' | 'delete' = 'add';
  @Input() admin: Admin = {} as Admin; // Asegúrate de que se inicialice correctamente
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Admin>();
  @Output() delete = new EventEmitter<void>();

  onSave() {
    // Aquí podrías añadir validaciones antes de emitir, si es necesario
    this.save.emit(this.admin);
  }

  onDelete() {
    this.delete.emit();
  }

  onClose() {
    this.close.emit();
  }
}
