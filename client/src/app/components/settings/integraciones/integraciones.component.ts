import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-integraciones',
  templateUrl: './integraciones.component.html',
  styleUrls: ['./integraciones.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class IntegracionesComponent {
  integraciones = [
    {
      titulo: 'Webhooks',
      descripcion:
        'Webhooks permiten enviar notificaciones HTTP a aplicaciones externas en respuesta a eventos de tu aplicación, como la creación o la eliminación de una cita.',
      boton: 'Configurar'
    },
    {
      titulo: 'Google Analytics',
      descripcion:
        'Google Analytics permite añadir de forma automática el código de seguimiento a tu página de reservas, para analizar el tráfico de la página pública de reservas.',
      boton: 'Configurar'
    },
    {
      titulo: 'Matomo Analytics',
      descripcion:
        'Matomo Analytics te permite rastrear el tráfico de tu página pública de reservas y analizar el comportamiento de los usuarios.',
      boton: 'Configurar'
    },
    {
      titulo: 'API',
      descripcion:
        'La API permite interactuar con todas las funcionalidades del sistema mediante peticiones HTTP, así como integrarte con aplicaciones externas.',
      boton: 'Configurar'
    },
    {
      titulo: 'LDAP',
      descripcion:
        'Esta integración te permite conectar con un servidor LDAP existente o Active Directory para autenticar a tus usuarios y sincronizar información de empleados.',
      boton: 'Configurar'
    }
  ];

  configurarIntegracion(titulo: string) {
    console.log(`Configurando integración: ${titulo}`);
  }
}
