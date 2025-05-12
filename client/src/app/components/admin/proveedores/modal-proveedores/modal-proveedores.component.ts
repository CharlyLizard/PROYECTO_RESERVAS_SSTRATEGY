import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // If using Material buttons in modal

import { Proveedor } from '../../../../models/proveedor/proveedor.model';
import { Servicio } from '../../../../models/servicios/servicio';

@Component({
  selector: 'app-modal-proveedores',
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor
    FormsModule,  // For [(ngModel)]
    MatButtonModule // Optional: if modal buttons are mat-button
  ],
  templateUrl: './modal-proveedores.component.html',
})
export class ModalProveedoresComponent {
  @Input() visible = false;
  @Input() modo: 'add' | 'edit' | 'delete' = 'add';

  // Internal state for the proveedor, initialized with a full default structure
  private _proveedorData: Partial<Proveedor> = {
    id: undefined,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    servicio: { id: null } // Ensures servicio and servicio.id path exists
  };

  @Input()
  set proveedor(value: Partial<Proveedor> | undefined) {
    // When input changes, update internal state, ensuring complete structure
    if (value) {
      this._proveedorData = {
        id: value.id,
        nombre: value.nombre || '',
        apellido: value.apellido || '',
        email: value.email || '',
        telefono: value.telefono || '',
        // Ensure 'servicio' is an object and 'id' is initialized
        servicio: (value.servicio && value.servicio.id !== undefined) ?
                  { id: value.servicio.id } :
                  { id: null }
      };
    } else {
      // Reset to default if undefined is passed or for a clean state
      this._proveedorData = {
        id: undefined,
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        servicio: { id: null }
      };
    }
  }

  get proveedor(): Partial<Proveedor> {
    return this._proveedorData;
  }

  @Input() servicios: Servicio[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Proveedor>(); // Emits a full Proveedor
  @Output() delete = new EventEmitter<void>();

  constructor() {}

  onSave(): void {
    if (this.validarFormulario()) {
      // The _proveedorData should be a valid Proveedor structure due to validation
      this.save.emit(this._proveedorData as Proveedor);
    }
  }

  onDelete(): void {
    this.delete.emit(); // Parent component uses its 'modalProveedor.id' for deletion
  }

  onClose(): void {
    this.close.emit();
  }

  private validarFormulario(): boolean {
    const p = this._proveedorData;
    if (!p.nombre?.trim() ||
        !p.apellido?.trim() ||
        !p.email?.trim() ||
        !p.servicio || p.servicio.id === null) {
      alert('Por favor complete todos los campos obligatorios: Nombre, Apellido, Correo Electrónico y Servicio.');
      return false;
    }
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(p.email)) {
      alert('Por favor ingrese un correo electrónico válido.');
      return false;
    }
    return true;
  }
}
