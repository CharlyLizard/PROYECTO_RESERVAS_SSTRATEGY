import { Component } from '@angular/core';
import { ConfigGeneralComponent } from './config-general/config-general.component';
import { ConfigCitasComponent } from './config-citas/config-citas.component';
import { LogicaNegocioComponent } from './logica-negocio/logica-negocio.component';
import { ContenidoLegalComponent } from './contenido-legal/contenido-legal.component';
import { IntegracionesComponent } from './integraciones/integraciones.component';
import { CommonModule, NgClass, NgSwitch } from '@angular/common';
import { AdminHeaderComponent } from "../admin/dashboard/admin-header/admin-header.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ConfigGeneralComponent,
    ConfigCitasComponent,
    LogicaNegocioComponent,
    ContenidoLegalComponent,
    IntegracionesComponent,
    NgClass,
    NgSwitch,
    CommonModule,
    AdminHeaderComponent
],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  selected: string = 'general';
}
