import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Proveedor } from '../../../../models/proveedor/proveedor.model';
import { Servicio } from '../../../../models/servicios/servicio';

@Component({
  selector: 'app-modal-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './modal-proveedores.component.html',
})
export class ModalProveedoresComponent {
  @Input() visible = false;
  @Input() modo: 'add' | 'edit' | 'delete' = 'add';
  @Input() servicios: Servicio[] = [];

  private _proveedorData: Partial<Proveedor> = {
    id: undefined,
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    email: '',
    telefono: '',
    telefonoMovil: '',
    domicilio: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    notas: '',
    servicio: { id: null }
  };

  @Input()
  set proveedor(value: Partial<Proveedor> | undefined) {
    if (value) {
      this._proveedorData = {
        id: value.id,
        nombre: value.nombre || '',
        apellido: value.apellido || '',
        nombreUsuario: value.nombreUsuario || '',
        email: value.email || '',
        telefono: value.telefono || '',
        telefonoMovil: value.telefonoMovil || '',
        domicilio: value.domicilio || '',
        ciudad: value.ciudad || '',
        estado: value.estado || '',
        codigoPostal: value.codigoPostal || '',
        notas: value.notas || '',
        servicio: (value.servicio && value.servicio.id !== undefined)
          ? { id: value.servicio.id }
          : { id: null }
      };
    } else {
      this._proveedorData = {
        id: undefined,
        nombre: '',
        apellido: '',
        nombreUsuario: '',
        email: '',
        telefono: '',
        telefonoMovil: '',
        domicilio: '',
        ciudad: '',
        estado: '',
        codigoPostal: '',
        notas: '',
        servicio: { id: null }
      };
    }
  }

  get proveedor(): Partial<Proveedor> {
    return this._proveedorData;
  }

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Proveedor>();
  @Output() delete = new EventEmitter<void>();

  onSave(): void {
    if (this.validarFormulario()) {
      this.save.emit(this._proveedorData as Proveedor);
    }
  }

  onDelete(): void {
    this.delete.emit();
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(p.email)) {
      alert('Por favor ingrese un correo electrónico válido.');
      return false;
    }
    return true;
  }
}
