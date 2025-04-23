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
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    AdminHeaderComponent
  ]
})
export class CuentaComponent {
  cuenta = {
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
    contrasena: '',
    reingreseContrasena: '',
    calendario: 'Predeterminado',
    idioma: 'Spanish',
    zonaHoraria: 'UTC',
    recibirNotificaciones: true
  };

  guardarCuenta() {
    console.log('Cuenta guardada:', this.cuenta);
  }
}
