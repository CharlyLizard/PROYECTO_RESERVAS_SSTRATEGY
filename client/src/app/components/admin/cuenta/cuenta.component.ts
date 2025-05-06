import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../dashboard/admin-header/admin-header.component';
import { AuthService } from '../../../services/api/auth.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    AdminHeaderComponent
  ]
})
// ...existing imports...
export class CuentaComponent implements OnInit {
  cuenta: any = {};
  cuentaOriginal: any = {};
  cambiosPendientes = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.adminData$.subscribe((admin: any) => {
      if (admin) {
        this.cuenta = { ...admin };
        this.cuentaOriginal = { ...admin };
        this.cambiosPendientes = false;
      }
    });
  }

  onInputChange() {
    this.cambiosPendientes = JSON.stringify(this.cuenta) !== JSON.stringify(this.cuentaOriginal);
  }

  
  guardarCuenta() {
    // Aquí haces la petición al backend para actualizar los datos
    this.authService.actualizarAdmin(this.cuenta).subscribe({
      next: (adminActualizado) => {
        this.cuentaOriginal = { ...adminActualizado };
        this.cambiosPendientes = false;
        // Opcional: mostrar mensaje de éxito
      },
      error: () => {
        // Opcional: mostrar mensaje de error
      }
    });
  }
}
