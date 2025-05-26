import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngIf, ngFor, etc. y pipes
import { FormsModule } from '@angular/forms';   // Necesario para [(ngModel)]

// Interfaz para la configuración de un campo
interface CampoConfig {
  mostrar: boolean;
  requerido: boolean;
}

@Component({
  selector: 'app-config-citas',
  standalone: true, // Asegúrate de que tu componente sea standalone
  imports: [CommonModule, FormsModule], // Añade CommonModule y FormsModule
  templateUrl: './config-citas.component.html',
  styleUrl: './config-citas.component.css'
})
export class ConfigCitasComponent {
  // Configuración para campos estándar
  // Los campos con asterisco (*) son obligatorios por defecto y no se pueden desmarcar como requeridos o no visibles.
  nombreConfig: CampoConfig = { mostrar: true, requerido: true };
  apellidoConfig: CampoConfig = { mostrar: true, requerido: true };
  emailConfig: CampoConfig = { mostrar: true, requerido: true };
  telefonoConfig: CampoConfig = { mostrar: true, requerido: true };

  // Campos opcionales cuya visibilidad y obligatoriedad se pueden configurar
  domicilioConfig: CampoConfig = { mostrar: true, requerido: false };
  ciudadConfig: CampoConfig = { mostrar: true, requerido: false };
  codigoPostalConfig: CampoConfig = { mostrar: true, requerido: false };
  notasConfig: CampoConfig = { mostrar: true, requerido: false };

  // Configuración para campos personalizados
  campoPersonalizado1Config: CampoConfig = { mostrar: false, requerido: false };
  campoPersonalizado2Config: CampoConfig = { mostrar: false, requerido: false };
  campoPersonalizado3Config: CampoConfig = { mostrar: false, requerido: false };
  campoPersonalizado4Config: CampoConfig = { mostrar: false, requerido: false };
  campoPersonalizado5Config: CampoConfig = { mostrar: false, requerido: false };

  // Configuración para las opciones
  opciones = {
    notificacionesClientes: true,
    limitarAcceso: false,
    captcha: false,
    cualquierProveedor: false,
    datosSesion: false,
    deshabilitarReservas: false,
  };

  constructor() {}

  guardarConfiguracion() {
    const configuracionActual = {
      camposEstandar: {
        nombre: this.nombreConfig,
        apellido: this.apellidoConfig,
        email: this.emailConfig,
        telefono: this.telefonoConfig,
        domicilio: this.domicilioConfig,
        ciudad: this.ciudadConfig,
        codigoPostal: this.codigoPostalConfig,
        notas: this.notasConfig,
      },
      camposPersonalizados: {
        campo1: this.campoPersonalizado1Config,
        campo2: this.campoPersonalizado2Config,
        campo3: this.campoPersonalizado3Config,
        campo4: this.campoPersonalizado4Config,
        campo5: this.campoPersonalizado5Config,
      },
      opciones: this.opciones,
    };
    console.log('Configuración de Citas:', configuracionActual);
    alert('La configuración actual se ha impreso en la consola del navegador.');
    // Aquí normalmente llamarías a un servicio para persistir esta configuración.
  }
}
