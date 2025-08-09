import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login = {
    email: '',
    password: ''
  }
  private authService = inject(AuthService);
  private router = inject(Router)


  onLogin() {
    this.authService.loginAndGet(this.login)
      .subscribe({
        next: () => this.router.navigate(['/profile']),
        error: (err) => {
          console.error('Login failed', err);
        }
      })
  }

  getProfile() {
    this.authService.profile$.subscribe();
  }
}
