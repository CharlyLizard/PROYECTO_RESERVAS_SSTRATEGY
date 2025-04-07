import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReservasDataService } from './../../../../../services/reservas-data.service';
@Component({
  selector: 'app-third-window',
  templateUrl: './third-window.component.html',
  imports: [CommonModule],
})
export class ThirdWindowComponent implements OnInit {
  reservationDetails: any = null;

  constructor(private reservasService: ReservasDataService) {}

  ngOnInit() {
    this.reservationDetails = this.reservasService.getReservationDetails();
  }
}
