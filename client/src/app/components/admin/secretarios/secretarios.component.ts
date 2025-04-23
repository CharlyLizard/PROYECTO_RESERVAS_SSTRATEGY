import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';

@Component({
  selector: 'app-secretarios',
  templateUrl: './secretarios.component.html',
  styleUrls: ['./secretarios.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    AdminHeaderComponent
  ]
})
export class SecretariosComponent {
  secretarios = [
    {
      id: 1,
      nombre: 'Ana',
      apellido: 'Pérez',
      email: 'ana.perez@example.com',
      telefono: '+34 600 000 000',
      telefonoMovil: '+34 600 111 111',
      domicilio: 'Calle Mayor 1',
      ciudad: 'Madrid',
      estado: 'Madrid',
      codigoPostal: '28001',
      notas: '',
      usuario: 'anaperez',
      recibirNotificaciones: true,
      proveedores: [
        { nombre: 'Jane Doe', seleccionado: true }
      ]
    }
    // Puedes agregar más secretarios/as aquí
  ];

  secretarioSeleccionado: any = null;

  selectSecretario(secretario: any) {
    this.secretarioSeleccionado = secretario;
  }

  addSecretario() {
    const nuevo = {
      id: this.secretarios.length + 1,
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      telefonoMovil: '',
      domicilio: '',
      ciudad: '',
      estado: '',
      codigoPostal: '',
      notas: '',
      usuario: '',
      recibirNotificaciones: false,
      proveedores: []
    };
    this.secretarios.push(nuevo);
    this.selectSecretario(nuevo);
  }

  editSecretario() {
    // Lógica de edición aquí si es necesario
  }

  deleteSecretario() {
    if (this.secretarioSeleccionado) {
      this.secretarios = this.secretarios.filter(s => s.id !== this.secretarioSeleccionado.id);
      this.secretarioSeleccionado = this.secretarios.length > 0 ? this.secretarios[0] : null;
    }
  }
}
