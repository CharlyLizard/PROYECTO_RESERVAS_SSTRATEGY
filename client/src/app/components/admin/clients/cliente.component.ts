import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { ModalClienteComponent } from './modal-clients/modal-cliente.component';
import { ClienteService } from '../../../services/api/clients.service';
import { Cliente } from '../../../models/client/cliente.model';
import { Appointment } from '../../../models/appointment/appointment.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    AdminHeaderComponent,
    ModalClienteComponent
  ]
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;
  textoBusqueda: string = '';

  citas: Appointment[] = [];

  modalVisible = false;
  modalModo: 'add' | 'edit' | 'delete' = 'add';
  modalCliente: Partial<Cliente> = {};

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;
    });
  }

  filtrarClientes(): void {
    this.clientesFiltrados = this.clientes.filter((cliente) =>
      cliente.name.toLowerCase().includes(this.textoBusqueda.toLowerCase())
    );
  }

  selectCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.cargarCitas(cliente.id);
  }

  cargarCitas(clientId: number): void {
    this.clienteService.getAppointmentsByClientId(clientId).subscribe((citas: Appointment[]) => {
      this.citas = citas;
    });
    }

  abrirModalAgregar(): void {
    this.modalModo = 'add';
    this.modalCliente = {};
    this.modalVisible = true;
  }

  abrirModalEditar(): void {
    if (this.clienteSeleccionado) {
      this.modalModo = 'edit';
      this.modalCliente = { ...this.clienteSeleccionado };
      this.modalVisible = true;
    }
  }

  abrirModalEliminar(): void {
    if (this.clienteSeleccionado) {
      this.modalModo = 'delete';
      this.modalCliente = { ...this.clienteSeleccionado };
      this.modalVisible = true;
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  guardarModal(cliente: Cliente): void {
    this.clienteService.gestionarCliente(this.modalModo, cliente).subscribe((resp: { clientes: Cliente[] }) => {
      this.clientes = resp.clientes;
      this.clientesFiltrados = resp.clientes;
      this.cerrarModal();
    });
  }

  eliminarModal(): void {
    if (this.modalCliente.id) {
      this.clienteService.gestionarCliente('delete', this.modalCliente as Cliente).subscribe((resp: { clientes: Cliente[] }) => {
        this.clientes = resp.clientes;
        this.clientesFiltrados = resp.clientes;
        this.clienteSeleccionado = null;
        this.cerrarModal();
      });
    }
  }
}
