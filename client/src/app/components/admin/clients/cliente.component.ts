import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {    AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    AdminHeaderComponent
  ]
})
export class ClientsComponent {
  selectedClient: any = null;

  clients = [
    {
      id: 1,
      name: 'Carlos',
      lastName: 'Martin Salvatierra',
      email: 'carlosmartinsalvatierra@gmail.com',
      phone: '666666666',
      address: '28006',
      city: 'Madrid',
      postalCode: '28006',
      language: 'Spanish',
      timezone: 'UTC',
      notes: '',
      appointments: [
        {
          service: 'Service - Jane Doe',
          date: '31/03/2025',
          time: '1:15 pm',
          timezone: 'UTC'
        },
        {
          service: 'Service - Jane Doe',
          date: '24/04/2025',
          time: '9:30 am',
          timezone: 'UTC'
        }
      ]
    }
  ];

  selectClient(client: any) {
    this.selectedClient = client;
  }
}
