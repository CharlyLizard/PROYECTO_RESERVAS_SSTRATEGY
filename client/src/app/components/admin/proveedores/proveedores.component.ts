import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    AdminHeaderComponent
  ]
})
export class ProveedoresComponent {
  selectedProvider: any = null;

  providers = [
    {
      id: 1,
      name: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.org',
      phone: '+1 (000) 000-0000',
      address: 'Calle Falsa 123',
      city: 'Madrid',
      postalCode: '28001',
      notes: '',
      services: [
        {
          name: 'Service 1',
          description: 'Descripción del servicio 1'
        },
        {
          name: 'Service 2',
          description: 'Descripción del servicio 2'
        }
      ]
    }
  ];

  selectProvider(provider: any) {
    this.selectedProvider = provider;
  }
}
