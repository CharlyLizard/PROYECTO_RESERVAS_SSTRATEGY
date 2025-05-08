import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { AdminService } from '../../../services/api/admin.service';
import { Admin } from '../../../models/admin/admin.model';
import { ModalAdministradoresComponent } from './modal-administradores/modal-administradores.component';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    AdminHeaderComponent,
    ModalAdministradoresComponent
  ]
})
export class AdministradoresComponent implements OnInit {
  administradores: Admin[] = [];
  administradorSeleccionado: Admin | null = null;
  filtro: string = '';

  // Modal
  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalAdmin: Admin = {} as Admin;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarAdministradores();
  }

  cargarAdministradores(): void {
    this.adminService.getAllAdmins().subscribe({
      next: (admins: Admin[]) => {
        this.administradores = admins;
        if (admins.length > 0) {
          this.administradorSeleccionado = admins[0];
        }
      },
      error: (err) => {
        console.error('Error al cargar administradores:', err);
      }
    });
  }

  selectAdministrador(admin: Admin) {
    this.administradorSeleccionado = admin;
  }

  addAdministrador() {
    this.modalModo = 'add';
    this.modalAdmin = {
      id: 0,
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
      calendario: 'Predeterminado',
      idioma: 'Spanish',
      zonaHoraria: '',
      recibirNotificaciones: false,
      contrasena: '',
      reingreseContrasena: ''
    };
    this.modalVisible = true;
  }

  editAdministrador() {
    if (this.administradorSeleccionado) {
      this.modalModo = 'edit';
      this.modalAdmin = { ...this.administradorSeleccionado, contrasena: '', reingreseContrasena: '' };
      this.modalVisible = true;
    }
  }

  deleteAdministrador() {
    if (this.administradorSeleccionado) {
      this.modalModo = 'delete';
      this.modalAdmin = { ...this.administradorSeleccionado };
      this.modalVisible = true;
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  guardarModal(admin: Admin): void {
    const adminToSend: any = { ...admin };
    if (adminToSend.contrasena) {
      adminToSend.password = adminToSend.contrasena;
    }
    delete adminToSend.contrasena;
    delete adminToSend.reingreseContrasena;

  this.adminService.gestionarAdmin(this.modalModo, adminToSend).subscribe({
    next: (resp: { administradores: Admin[], admin?: Admin }) => {
      this.administradores = resp.administradores;
      const adminActualizado = resp.administradores.find(a => a.id === (resp.admin?.id || admin.id));
      this.administradorSeleccionado = adminActualizado || this.administradores[0] || null;
      this.cerrarModal();
    },
    error: (err) => {
      console.error('Error al guardar administrador:', err);
      this.cerrarModal();
    }
  });
  }

  eliminarModal(): void {
    this.adminService.gestionarAdmin('delete', this.modalAdmin).subscribe({
      next: (resp: { administradores: Admin[] }) => {
        this.administradores = resp.administradores;
        this.administradorSeleccionado = this.administradores.length > 0 ? this.administradores[0] : null;
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al eliminar administrador:', err);
        this.cerrarModal();
      }
    });
  }

  get administradoresFiltrados(): Admin[] {
    if (!this.filtro) return this.administradores;
    const filtroLower = this.filtro.toLowerCase();
    return this.administradores.filter(a =>
      a.nombre.toLowerCase().includes(filtroLower) ||
      a.apellido.toLowerCase().includes(filtroLower) ||
      a.nombreUsuario.toLowerCase().includes(filtroLower) ||
      a.email.toLowerCase().includes(filtroLower)
    );
  }
}
