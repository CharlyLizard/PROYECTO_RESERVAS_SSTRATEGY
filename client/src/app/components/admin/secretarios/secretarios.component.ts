import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { FormsModule } from '@angular/forms';

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
    AdminHeaderComponent,
    FormsModule
  ]
})
export class SecretariosComponent {
  secretariosFiltrados: any[] = [];
  secretarioSeleccionado: any = null;
  textoBusqueda: string = '';

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


  selectSecretario(secretario: any) {
    this.secretarioSeleccionado = secretario;
  }
  ngOnInit() {
    // Inicializar la lista filtrada con todos los secretarios al cargar el componente
    this.secretariosFiltrados = this.secretarios;
  }
  filtrarSecretarios(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (texto === '') {
      this.secretariosFiltrados = this.secretarios;
    } else {
      this.secretariosFiltrados = this.secretarios.filter((secretario) =>
        secretario.nombre.toLowerCase().includes(texto) ||
        secretario.apellido.toLowerCase().includes(texto) ||
        secretario.email.toLowerCase().includes(texto)
      );
    }
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
