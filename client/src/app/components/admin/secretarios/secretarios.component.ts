import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { FormsModule } from '@angular/forms';
import { SecretarioService } from '../../../services/api/secretario.service';
import { Secretario } from '../../../models/secretario/secretario.model';
import { ModalSecretariosComponent } from './modal-secretarios/modal-secretarios.component';

@Component({
  selector: 'app-secretarios',
  templateUrl: './secretarios.component.html',
  styleUrls: ['./secretarios.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    AdminHeaderComponent,
    FormsModule,
    ModalSecretariosComponent,
  ],
})
export class SecretariosComponent implements OnInit {
  secretarios: Secretario[] = [];
  secretariosFiltrados: Secretario[] = [];
  secretarioSeleccionado: Secretario | null = null;
  textoBusqueda: string = '';

  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalSecretario: Partial<Secretario> = {};

  constructor(private secretarioService: SecretarioService) {}

  ngOnInit() {
    this.secretarioService.getAllSecretarios().subscribe((secretarios) => {
      this.secretarios = secretarios;
      this.secretariosFiltrados = secretarios;
      this.secretarioSeleccionado =
        secretarios.length > 0 ? secretarios[0] : null;
    });
  }

  selectSecretario(secretario: Secretario) {
    this.secretarioSeleccionado = secretario;
  }

  filtrarSecretarios(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (texto === '') {
      this.secretariosFiltrados = this.secretarios;
    } else {
      this.secretariosFiltrados = this.secretarios.filter(
        (secretario) =>
          secretario.nombre.toLowerCase().includes(texto) ||
          secretario.apellido.toLowerCase().includes(texto) ||
          secretario.email.toLowerCase().includes(texto)
      );
    }
  }

  addSecretario() {
    this.modalModo = 'add';
    this.modalSecretario = {
      nombre: '',
      apellido: '',
      nombreUsuario: '',
      email: '',
      telefono: '',
      telefonoMovil: '',
      domicilio: '',
      ciudad: '',
      estado: '',
      codigoPostal: '',
      notas: '',
      calendario: '',
      idioma: '',
      zonaHoraria: '',
      recibirNotificaciones: false,
    };
    this.modalVisible = true;
  }

  editSecretario() {
    if (this.secretarioSeleccionado) {
      this.modalModo = 'edit';
      this.modalSecretario = { ...this.secretarioSeleccionado };
      this.modalVisible = true;
    }
  }

  deleteSecretario() {
    if (this.secretarioSeleccionado) {
      this.modalModo = 'delete';
      this.modalSecretario = { ...this.secretarioSeleccionado };
      this.modalVisible = true;
    }
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  guardarModal(secretario: Secretario): void {
    this.secretarioService
      .gestionarSecretario(this.modalModo, secretario)
      .subscribe({
        next: (resp: {
          secretarios: Secretario[];
          secretario?: Secretario;
        }) => {
          this.secretarios = resp.secretarios;
          this.secretariosFiltrados = resp.secretarios;
          const secretarioActualizado = resp.secretarios.find(
            (s) => s.id === (resp.secretario?.id || secretario.id)
          );
          this.secretarioSeleccionado =
            secretarioActualizado || this.secretarios[0] || null;
          this.cerrarModal();
        },
        error: (err: any) => {
          console.error('Error al guardar secretario:', err);
          this.cerrarModal();
        },
      });
  }

  eliminarModal(): void {
    this.secretarioService
      .gestionarSecretario('delete', this.modalSecretario)
      .subscribe({
        next: (resp: { secretarios: Secretario[] }) => {
          this.secretarios = resp.secretarios;
          this.secretariosFiltrados = resp.secretarios;
          this.secretarioSeleccionado =
            this.secretarios.length > 0 ? this.secretarios[0] : null;
          this.cerrarModal();
        },
        error: (err: any) => {
          console.error('Error al eliminar secretario:', err);
          this.cerrarModal();
        },
      });
  }
}
