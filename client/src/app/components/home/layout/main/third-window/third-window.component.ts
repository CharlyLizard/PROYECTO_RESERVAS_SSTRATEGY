import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReservasDataService } from './../../../../../services/reservas-data.service';
import { ApiService } from '../../../../../services/api/api.service';
@Component({
  selector: 'app-third-window',
  templateUrl: './third-window.component.html',
  imports: [CommonModule],
})
export class ThirdWindowComponent implements OnInit {
  reservationDetails: any = null;
  servicioSeleccionado: any = null;
  
  constructor(private reservasService: ReservasDataService , private ApiService: ApiService) {}

  ngOnInit() {
    this.reservationDetails = this.reservasService.getReservationDetails();
    this.ApiService.getServicioSeleccionado().subscribe(servicios => {
      // Si solo hay uno seleccionado, tomamos el primero
      this.servicioSeleccionado = servicios && servicios.length > 0 ? servicios[0] : null;
    });
  }
}
