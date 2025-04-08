import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
})
export class LoginWindowComponent {
  constructor(private router: Router) {} // Inyecta el servicio Router en el constructor

  login(): void {
    // Redirige a la ruta /admin
    this.router.navigate(['/admin']);
  }
}
