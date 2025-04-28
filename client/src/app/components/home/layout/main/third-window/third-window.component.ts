import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReservasDataService } from './../../../../../services/reservas-data.service';
import { ApiService } from '../../../../../services/api/api.service';
import { Servicio } from '../../../../../models/servicios/servicio';
@Component({
  selector: 'app-third-window',
  templateUrl: './third-window.component.html',
  imports: [CommonModule],
})
export class ThirdWindowComponent implements OnInit {
  reservationDetails: any = null;
  servicioSeleccionado: Servicio | null = null;

  constructor(private reservasService: ReservasDataService , private ApiService: ApiService) {}

  ngOnInit() {
    this.reservationDetails = this.reservasService.getReservationDetails();
    this.ApiService.getServicioSeleccionado().subscribe(servicios => {
      this.servicioSeleccionado = servicios && servicios.length > 0 ? servicios[0] : null;
      if (this.servicioSeleccionado) {
        this.reservasService.setServicioSeleccionado(this.servicioSeleccionado);
      }
    });
  }
}
