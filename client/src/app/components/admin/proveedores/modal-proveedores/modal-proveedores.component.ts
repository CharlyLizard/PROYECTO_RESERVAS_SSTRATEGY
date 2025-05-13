import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Proveedor } from '../../../../models/proveedor/proveedor.model';
import { Servicio } from '../../../../models/servicios/servicio';
import { Secretario } from '../../../../models/secretario/secretario.model';

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
  @Input() todosLosSecretarios: Secretario[] = [];
  @Input() secretariosDisponiblesParaDropdown: Secretario[] = [];
  @Input() proveedor: Partial<Proveedor> = this.getEmptyProveedor();

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ proveedorData: Proveedor, secretarioIdSeleccionado: number | null, secretarioIdOriginal: number | null }>();
  @Output() delete = new EventEmitter<void>();

  secretarioIdSeleccionadoEnModal: number | null = null;
  secretarioIdOriginalAsignado: number | null = null;

  ngOnChanges(): void {
    if (this.modo === 'edit' && this.proveedor && this.todosLosSecretarios.length > 0) {
      const secretarioAsignado = this.todosLosSecretarios.find(s => s.proveedor?.id === this.proveedor.id);
      this.secretarioIdSeleccionadoEnModal = secretarioAsignado ? secretarioAsignado.id : null;
      this.secretarioIdOriginalAsignado = this.secretarioIdSeleccionadoEnModal;
    } else if (this.modo === 'add') {
      this.secretarioIdSeleccionadoEnModal = null;
      this.secretarioIdOriginalAsignado = null;
    }
    // Asegura estructura
    if (!this.proveedor.servicio) this.proveedor.servicio = { id: null };
  }

  getEmptyProveedor(): Partial<Proveedor> {
    return {
      id: undefined, nombre: '', apellido: '', nombreUsuario: '', email: '',
      telefono: '', telefonoMovil: '', domicilio: '', ciudad: '', estado: '',
      codigoPostal: '', notas: '', servicio: { id: null },
    };
  }

  onSave(): void {
    if (this.validarFormulario()) {
      this.save.emit({
        proveedorData: this.proveedor as Proveedor,
        secretarioIdSeleccionado: this.secretarioIdSeleccionadoEnModal,
        secretarioIdOriginal: this.secretarioIdOriginalAsignado
      });
    }
  }

  onDelete(): void { this.delete.emit(); }
  onClose(): void { this.close.emit(); }

  private validarFormulario(): boolean {
    const p = this.proveedor;
    if (!p.nombre?.trim() || !p.apellido?.trim() || !p.email?.trim() || !p.servicio || p.servicio.id === null) {
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