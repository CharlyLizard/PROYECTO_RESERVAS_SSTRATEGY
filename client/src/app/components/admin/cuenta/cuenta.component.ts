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
import { Admin } from '../../../models/admin/admin.model';

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
export class CuentaComponent implements OnInit {
  cuenta: Admin = {} as Admin;
  cuentaOriginal: Admin = {} as Admin;
  cambiosPendientes = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.adminData$.subscribe((admin: Admin | null) => {
      if (admin) {
        this.cuenta = { ...admin };
        this.cuenta.contrasena = '';
        this.cuenta.reingreseContrasena = '';
        this.cuentaOriginal = { ...admin };
        this.cambiosPendientes = false;
      }
    });
  }

  onInputChange() {
    const { contrasena, reingreseContrasena, ...cuentaToCompare } = this.cuenta;
    const { contrasena: originalContrasena, reingreseContrasena: originalReingreseContrasena, ...originalToCompare } = this.cuentaOriginal;
    this.cambiosPendientes = JSON.stringify(cuentaToCompare) !== JSON.stringify(originalToCompare);
  }

  guardarCuenta() {
    const { reingreseContrasena, ...cuentaParaGuardar } = this.cuenta;

    if (!cuentaParaGuardar.contrasena) {
        delete cuentaParaGuardar.contrasena;
    }

    this.authService.actualizarAdmin(cuentaParaGuardar).subscribe({
      next: (adminActualizado: Admin) => {
        this.cuentaOriginal = { ...adminActualizado };
        this.cuenta.contrasena = '';
        this.cuenta.reingreseContrasena = '';
        this.cambiosPendientes = false;
      },
      error: () => {
      }
    });
  }
}
