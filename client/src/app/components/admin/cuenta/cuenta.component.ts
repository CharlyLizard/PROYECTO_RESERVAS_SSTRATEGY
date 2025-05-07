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
// ...existing imports...
export class CuentaComponent implements OnInit {
  cuenta: Admin = {} as Admin; // Usa el tipo Admin e inicializa
  cuentaOriginal: Admin = {} as Admin; // Usa el tipo Admin e inicializa
  cambiosPendientes = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.adminData$.subscribe((admin: Admin | null) => { // Tipa el parámetro admin
      if (admin) {
        this.cuenta = { ...admin };
        // Asegúrate de que los campos opcionales que no vengan del backend se inicialicen si es necesario para el formulario
        this.cuenta.contrasena = '';
        this.cuenta.reingreseContrasena = '';
        this.cuentaOriginal = { ...admin };
        this.cambiosPendientes = false;
      }
    });
  }

  onInputChange() {
    // Compara solo los campos que se guardan, o maneja contrasena/reingreseContrasena por separado si no se envían
    const { contrasena, reingreseContrasena, ...cuentaToCompare } = this.cuenta;
    const { contrasena: originalContrasena, reingreseContrasena: originalReingreseContrasena, ...originalToCompare } = this.cuentaOriginal;
    this.cambiosPendientes = JSON.stringify(cuentaToCompare) !== JSON.stringify(originalToCompare);
  }

  guardarCuenta() {
    // Prepara el objeto a enviar, excluyendo campos que no van al backend (como reingreseContrasena)
    const { reingreseContrasena, ...cuentaParaGuardar } = this.cuenta;

    // Si la contraseña no se ha modificado (está vacía), no la envíes o envíala como null
    // dependiendo de cómo lo maneje tu backend para no cambiarla.
    if (!cuentaParaGuardar.contrasena) {
        delete cuentaParaGuardar.contrasena;
    }

    this.authService.actualizarAdmin(cuentaParaGuardar).subscribe({
      next: (adminActualizado: Admin) => { // Tipa la respuesta
        this.cuentaOriginal = { ...adminActualizado };
        // Reinicia los campos de contraseña en el formulario si es necesario
        this.cuenta.contrasena = '';
        this.cuenta.reingreseContrasena = '';
        this.cambiosPendientes = false;
        // Opcional: mostrar mensaje de éxito
      },
      error: () => {
        // Opcional: mostrar mensaje de error
      }
    });
  }
}
