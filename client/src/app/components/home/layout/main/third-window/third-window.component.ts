import { Component, OnInit } from '@angular/core';
import { ReservasDataService } from './../../../../../services/reservas-data.service';

@Component({
  selector: 'app-third-window',
  templateUrl: './third-window.component.html',
})
export class ThirdWindowComponent implements OnInit {
  contactInfo: any = null;

  constructor(private reservasService: ReservasDataService) {}

  ngOnInit() {
    // Recuperar los datos de contacto desde el servicio
    this.contactInfo = this.reservasService.getContactInfo();
  }
}
