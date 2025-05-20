import { Component, OnInit } from '@angular/core';
import { ConfigGeneral } from '../../../models/admin/config-general.model';
import { ConfiguracionService } from '../../../services/api/configuracion.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-config-general',
  templateUrl: './config-general.component.html',
  styleUrls: ['./config-general.component.css'],
    standalone: true,
  imports: [FormsModule]

})
export class ConfigGeneralComponent implements OnInit {
  config: ConfigGeneral = {
    nombreEmpresa: '',
    emailEmpresa: '',
    enlaceEmpresa: '',
    logotipoUrl: '',
    selectedFile: null,
    colorCorporativo: '',
    tema: '',
    formatoFecha: '',
    primerDiaSemana: '',
    idiomaPredeterminado: '',
    zonaHorariaPredeterminada: ''
  };

  constructor(private configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    this.cargarConfiguracion();
  }
onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.config.selectedFile = file; // Guarda el archivo seleccionado en el modelo

    // Llama al servicio para subir el logotipo
    this.configuracionService.uploadLogo(file).subscribe({
      next: (response: { logotipoUrl: string }) => {
        this.config.logotipoUrl = response.logotipoUrl; // Actualiza la URL del logotipo
        alert('Logotipo subido con éxito.');
      },
      error: (err: any) => {
        console.error('Error al subir el logotipo:', err);
        alert('Error al subir el logotipo.');
      }
    });
  }
}
  cargarConfiguracion(): void {
    this.configuracionService.getGeneralConfig().subscribe({
      next: (config: ConfigGeneral) => {
        this.config = config;
      },
      error: (err: any) => {
        console.error('Error al cargar la configuración:', err);
      }
    });
  }

  guardarConfiguracion(): void {
    const configToSave = { ...this.config };
    //delete configToSave.selectedFile;

    this.configuracionService.saveGeneralConfig(configToSave).subscribe({
      next: (savedConfig: ConfigGeneral) => {
        this.config = savedConfig;
        alert('Configuración guardada con éxito.');
      },
      error: (err: any) => {
        console.error('Error al guardar la configuración:', err);
        alert('Error al guardar la configuración.');
      }
    });
  }

  subirLogotipo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.configuracionService.uploadLogo(file).subscribe({
        next: (response: { logotipoUrl: string }) => {
          this.config.logotipoUrl = response.logotipoUrl;
          alert('Logotipo subido con éxito.');
        },
        error: (err: any) => {
          console.error('Error al subir el logotipo:', err);
          alert('Error al subir el logotipo.');
        }
      });
    }
  }
}
