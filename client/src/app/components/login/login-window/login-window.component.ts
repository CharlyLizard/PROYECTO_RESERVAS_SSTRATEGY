import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
})
export class LoginWindowComponent {
  constructor(private router: Router) {}

  login(): void {
    this.router.navigate(['/admin']);
  }
}
