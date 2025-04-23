import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AdminHeaderComponent
  ]
})
export class AcercaDeComponent {}
