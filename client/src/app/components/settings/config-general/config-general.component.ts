import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf
import { FormsModule } from '@angular/forms';   // Necesario para [(ngModel)]
import { ConfiguracionService } from '../../../services/api/configuracion.service'; // Asegúrate que la ruta es correcta

export interface ConfigGeneral {
  nombreEmpresa: string;
  emailEmpresa: string;
  enlaceEmpresa: string;
  logotipoUrl?: string; // URL del logotipo actual (la carga de archivos se maneja por separado)
  selectedFile?: File | null; // Para el archivo seleccionado
  colorCorporativo: string;
  tema: string;
  formatoFecha: string;
  primerDiaSemana: string;
  idiomaPredeterminado: string;
  zonaHorariaPredeterminada: string;
}

@Component({
  selector: 'app-config-general',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de que FormsModule y CommonModule estén aquí
  templateUrl: './config-general.component.html',
  styleUrl: './config-general.component.css'
})
export class ConfigGeneralComponent implements OnInit {
  config: ConfigGeneral = {
    nombreEmpresa: '',
    emailEmpresa: '',
    enlaceEmpresa: '',
    logotipoUrl: '',
    selectedFile: null,
    colorCorporativo: '#439B84',
    tema: 'Default',
    formatoFecha: 'DMY',
    primerDiaSemana: 'Lunes',
    idiomaPredeterminado: 'Español',
    zonaHorariaPredeterminada: 'UTC'
  };

  constructor(private configuracionService: ConfiguracionService) {} // Inyecta el servicio

  ngOnInit(): void {
    this.cargarConfiguracion();
  }

  cargarConfiguracion(): void {
    this.configuracionService.getGeneralConfig().subscribe({
      next: (data) => {
        if (data) {
          this.config = { ...this.config, ...data }; // Fusiona con valores por defecto
          if (data.logotipoUrl) { // Si el backend devuelve la URL del logo
            this.config.logotipoUrl = data.logotipoUrl;
          }
        }
        console.log('Configuración general cargada:', this.config);
      },
      error: (err) => console.error('Error al cargar la configuración general:', err)
    });
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.config.selectedFile = fileList[0];
      // Opcional: Mostrar previsualización
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.config.logotipoUrl = e.target.result; // Para previsualización
      };
      reader.readAsDataURL(this.config.selectedFile);
      console.log('Archivo seleccionado:', this.config.selectedFile.name);
    } else {
      this.config.selectedFile = null;
    }
  }

  guardarConfiguracion(): void {
    if (this.config.selectedFile) {
      this.configuracionService.uploadLogo(this.config.selectedFile).subscribe({
        next: (response) => {
          // Asumiendo que el backend devuelve la nueva URL del logo
          this.config.logotipoUrl = response.logotipoUrl;
          this.guardarDatosConfig();
        },
        error: (err) => console.error('Error al subir el logotipo:', err)
      });
    } else {
      this.guardarDatosConfig();
    }
  }

  private guardarDatosConfig(): void {
    // Crea una copia del objeto config sin selectedFile para enviar al backend
    const configToSave = { ...this.config };
    delete configToSave.selectedFile;

    this.configuracionService.saveGeneralConfig(configToSave).subscribe({
      next: (savedConfig) => {
        this.config = { ...this.config, ...savedConfig };
        if (savedConfig.logotipoUrl) {
          this.config.logotipoUrl = savedConfig.logotipoUrl;
        }
        this.config.selectedFile = null; // Limpiar el archivo seleccionado después de guardar
        console.log('Configuración general guardada exitosamente:', this.config);
        // Aquí podrías mostrar una notificación de éxito al usuario
      },
      error: (err) => console.error('Error al guardar la configuración general:', err)
    });
  }
}
