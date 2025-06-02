import { Component, OnInit } from '@angular/core';
// CommonModule ya no es necesario con el nuevo control de flujo
// import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'; // FormsModule sigue siendo necesario para [(ngModel)]
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
    // CommonModule, // Eliminar CommonModule
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule, // Mantener FormsModule para [(ngModel)] y otros
    AdminHeaderComponent,
    ModalAdministradoresComponent
  ]
})
export class AdministradoresComponent implements OnInit {
  administradores: Admin[] = [];
  administradorSeleccionado: Admin | null = null;
  filtro: string = '';

  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalAdmin: Admin = {} as Admin; // Asegúrate de que esto se inicialice adecuadamente

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarAdministradores();
  }

  cargarAdministradores(): void {
    this.adminService.getAllAdmins().subscribe({
      next: (admins: Admin[]) => {
        this.administradores = admins;
        if (admins.length > 0 && !this.administradorSeleccionado) { // Seleccionar solo si no hay uno ya
          this.selectAdministrador(admins[0]);
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
    this.modalAdmin = { // Proporciona una estructura inicial completa para Admin
      id: 0, // o null/undefined si es nuevo y el backend lo maneja
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
      calendario: 'Predeterminado', // Valor por defecto
      idioma: 'Spanish', // Valor por defecto
      zonaHoraria: '', // O un valor por defecto
      recibirNotificaciones: false,
      contrasena: '', // Para el modal
      reingreseContrasena: '' // Para el modal
    };
    this.modalVisible = true;
  }

  editAdministrador() {
    if (this.administradorSeleccionado) {
      this.modalModo = 'edit';
      // Clonar para evitar modificar el original directamente hasta guardar
      this.modalAdmin = { ...this.administradorSeleccionado, contrasena: '', reingreseContrasena: '' };
      this.modalVisible = true;
    }
  }

  deleteAdministrador() {
    if (this.administradorSeleccionado) {
      this.modalModo = 'delete';
      this.modalAdmin = { ...this.administradorSeleccionado }; // Clonar para el modal
      this.modalVisible = true;
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  guardarModal(admin: Admin): void {
    const adminToSend: any = { ...admin };

    // Solo enviar 'password' si se ha introducido una nueva contraseña
    if (adminToSend.contrasena && adminToSend.contrasena.trim() !== '') {
      adminToSend.password = adminToSend.contrasena;
    }
    // Eliminar campos temporales del modal
    delete adminToSend.contrasena;
    delete adminToSend.reingreseContrasena;

    this.adminService.gestionarAdmin(this.modalModo, adminToSend).subscribe({
      next: (resp: { administradores: Admin[], admin?: Admin }) => {
        this.administradores = resp.administradores;
        // Actualizar o seleccionar el administrador
        const adminActualizado = resp.administradores.find(a => a.id === (resp.admin?.id || admin.id));
        this.selectAdministrador(adminActualizado || (this.administradores.length > 0 ? this.administradores[0] : null!));
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al guardar administrador:', err);
        // Considera no cerrar el modal en caso de error para que el usuario pueda reintentar
        // this.cerrarModal();
      }
    });
  }

  eliminarModal(): void {
    if (!this.modalAdmin || this.modalAdmin.id === undefined || this.modalAdmin.id === 0) { // Asegúrate de que modalAdmin y su id existen
        console.error("No se puede eliminar un administrador sin ID.");
        this.cerrarModal();
        return;
    }
    this.adminService.gestionarAdmin('delete', this.modalAdmin).subscribe({
      next: (resp: { administradores: Admin[] }) => {
        this.administradores = resp.administradores;
        // Seleccionar el primero de la lista o ninguno si está vacía
        this.selectAdministrador(this.administradores.length > 0 ? this.administradores[0] : null!);
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
      (a.nombre?.toLowerCase() || '').includes(filtroLower) ||
      (a.apellido?.toLowerCase() || '').includes(filtroLower) ||
      (a.nombreUsuario?.toLowerCase() || '').includes(filtroLower) ||
      (a.email?.toLowerCase() || '').includes(filtroLower)
    );
  }
}
