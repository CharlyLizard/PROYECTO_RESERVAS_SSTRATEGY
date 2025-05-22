import { Component, signal, WritableSignal } from '@angular/core'; // Importa signal y WritableSignal
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contenido-legal',
  templateUrl: './contenido-legal.component.html',
  styleUrls: ['./contenido-legal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCheckboxModule, MatIconModule]
})
export class ContenidoLegalComponent {
  // Usamos WritableSignal para cada propiedad
  avisoCookiesMostrar: WritableSignal<boolean> = signal(true);
  avisoCookiesTexto: WritableSignal<string> = signal(
    'Este sitio web utiliza cookies para mejorar su experiencia. Asumiremos que está de acuerdo con esto, pero puede optar por no participar si lo desea. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nisl vitae nisl.'
  );

  terminosCondicionesMostrar: WritableSignal<boolean> = signal(true);
  terminosCondicionesTexto: WritableSignal<string> = signal(
    'Al acceder y utilizar este servicio, usted acepta y accede a estar sujeto a los términos y disposiciones de este acuerdo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nisl vitae nisl. Sed euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nisl vitae nisl.'
  );

  politicaPrivacidadMostrar: WritableSignal<boolean> = signal(true);
  politicaPrivacidadTexto: WritableSignal<string> = signal(
    'Nos tomamos muy en serio su privacidad. Esta política describe qué información recopilamos y cómo la usamos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nisl vitae nisl. Vivamus euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nisl vitae nisl.'
  );

  guardarContenido() {
    // Con Signals, los datos ya están "guardados" en las señales.
    // Esta función puede usarse para lógica adicional si es necesario,
    // como marcar que los datos están "confirmados" por el usuario
    // o interactuar con otros servicios locales si fuera el caso.
    console.log('Contenido legal "guardado" en señales:');
    console.log('Aviso Cookies Texto:', this.avisoCookiesTexto());
    console.log('Términos y Condiciones Texto:', this.terminosCondicionesTexto());
    console.log('Política Privacidad Texto:', this.politicaPrivacidadTexto());
    // Aquí podrías, por ejemplo, mostrar una notificación de "Cambios guardados localmente"
    alert('Cambios guardados localmente en la página.');
  }
}
