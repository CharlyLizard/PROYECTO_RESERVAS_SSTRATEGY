import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule, // Add MatSelectModule
    FormsModule, // Add FormsModule
    AdminHeaderComponent
  ]
})
export class AdministradoresComponent {
  administradores = [
    {
      id: 1,
      nombre: 'Ángel',
      apellido: 'Esteban Sanz',
      email: 'aestebans@gmail.com',
      telefono: '618148800',
      telefonoMovil: '',
      domicilio: '',
      ciudad: '',
      estado: '',
      codigoPostal: '',
      notas: '',
      nombreUsuario: 'sstrategy',
      calendario: 'Predeterminado',
      idioma: 'Spanish',
      zonaHoraria: 'UTC',
      recibirNotificaciones: true
    }
  ];

  administradorSeleccionado: any = null;

  selectAdministrador(admin: any) {
    this.administradorSeleccionado = admin;
  }

  addAdministrador() {
    console.log('Agregar administrador');
  }

  editAdministrador() {
    console.log('Editar administrador');
  }

  deleteAdministrador() {
    console.log('Eliminar administrador');
  }
}
