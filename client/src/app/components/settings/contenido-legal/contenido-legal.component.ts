import { Component } from '@angular/core';
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
  imports: [CommonModule, FormsModule, MatButtonModule, MatCheckboxModule,MatIconModule]
})
export class ContenidoLegalComponent {
  contenido = {
    avisoCookies: {
      mostrar: true,
      texto: 'Cookie notice content.'
    },
    terminosCondiciones: {
      mostrar: true,
      texto: 'Terms and conditions content.'
    },
    politicaPrivacidad: {
      mostrar: true,
      texto: 'Privacy policy content.'
    }
  };

  guardarContenido() {
    console.log('Contenido guardado:', this.contenido);
  }
}
