import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReservasDataService } from './../../../../../services/reservas-data.service';
import { ApiService } from '../../../../../services/api/api.service';
import { Servicio } from '../../../../../models/servicios/servicio';
import { Proveedor } from '../../../../../models/proveedor/proveedor.model';
import { Secretario } from '../../../../../models/secretario/secretario.model';
import { ProveedoresService } from '../../../../../services/api/proveedores.service';
import { SecretarioService } from '../../../../../services/api/secretario.service';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { TranslatePipe } from '../../../../../pipe/translate.pipe';

@Component({
  selector: 'app-third-window',
  templateUrl: './third-window.component.html',
  standalone: true, // Asumiendo que es standalone como otros componentes recientes
  imports: [CommonModule,TranslatePipe] // Asegúrate que CommonModule está si usas *ngIf, etc.
})
export class ThirdWindowComponent implements OnInit {
  reservationDetails: any = null;
  servicioSeleccionado: Servicio | null = null;
  proveedorDelServicio: Proveedor | null = null;
  secretarioAsociado: Secretario | null = null;

  constructor(
    private reservasService: ReservasDataService,
    private apiService: ApiService, // Cambiado ApiService a apiService (convención)
    private proveedoresService: ProveedoresService,
    private secretarioService: SecretarioService
  ) {}

  ngOnInit() {
    this.reservationDetails = this.reservasService.getReservationDetails();

    this.apiService.getServicioSeleccionado().pipe(
      switchMap(servicios => {
        this.servicioSeleccionado = servicios && servicios.length > 0 ? servicios[0] : null;
        if (this.servicioSeleccionado) {
          this.reservasService.setServicioSeleccionado(this.servicioSeleccionado);
          // Cargar proveedores y secretarios
          return forkJoin({
            proveedores: this.proveedoresService.getProveedores(),
            secretarios: this.secretarioService.getAllSecretarios()
          });
        }
        return of({ proveedores: [], secretarios: [] }); // Emite valor por defecto si no hay servicio
      }),
      map(({ proveedores, secretarios }) => {
        if (this.servicioSeleccionado && proveedores.length > 0) {
          this.proveedorDelServicio = proveedores.find(p => p.servicio?.id === this.servicioSeleccionado!.id) || null;
        }
        if (this.proveedorDelServicio && secretarios.length > 0) {
          this.secretarioAsociado = secretarios.find(s => s.proveedor?.id === this.proveedorDelServicio!.id) || null;
        }
        return null; // forkJoin ya emitió, aquí solo procesamos
      })
    ).subscribe({
        error: err => console.error('Error cargando datos adicionales para la confirmación:', err)
    });
  }
}
