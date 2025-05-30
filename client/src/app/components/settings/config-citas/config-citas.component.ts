import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CampoConfig {
  mostrar: boolean;
  requerido: boolean;
}

@Component({
  selector: 'app-config-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config-citas.component.html',
})
export class ConfigCitasComponent {
  nombreConfig: CampoConfig = { mostrar: true, requerido: true };
  apellidoConfig: CampoConfig = { mostrar: true, requerido: true };
  emailConfig: CampoConfig = { mostrar: true, requerido: true };
  telefonoConfig: CampoConfig = { mostrar: true, requerido: true };

  domicilioConfig: CampoConfig = { mostrar: true, requerido: false };
  ciudadConfig: CampoConfig = { mostrar: true, requerido: false };
  codigoPostalConfig: CampoConfig = { mostrar: true, requerido: false };
  notasConfig: CampoConfig = { mostrar: true, requerido: false };

  campoPersonalizado1Config: CampoConfig = { mostrar: false, requerido: false };
  campoPersonalizado2Config: CampoConfig = { mostrar: false, requerido: false };
  campoPersonalizado3Config: CampoConfig = { mostrar: false, requerido: false };
  campoPersonalizado4Config: CampoConfig = { mostrar: false, requerido: false };
  campoPersonalizado5Config: CampoConfig = { mostrar: false, requerido: false };

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
  }
}
