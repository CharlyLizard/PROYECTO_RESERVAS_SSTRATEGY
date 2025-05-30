import { Component } from '@angular/core';
import { AuthService } from '../../../services/api/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginWindowComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        this.authService.setAdminData(response.admin);
        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Login error:', err); // LOG 2
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
