import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admin } from '../../../../models/admin/admin.model';
import { Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-modal-administradores',
  imports: [CommonModule,FormsModule, MatButtonModule],
  standalone: true,
  templateUrl: './modal-administradores.component.html',
  styleUrl: './modal-administradores.component.css'
})
export class ModalAdministradoresComponent {
  @Input() visible = false;
  @Input() modo: 'add' | 'edit' | 'delete' = 'add';
  @Input() admin: Admin = {} as Admin;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Admin>();
  @Output() delete = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.admin);
  }

  onDelete() {
    this.delete.emit();
  }

  onClose() {
    this.close.emit();
  }
}
