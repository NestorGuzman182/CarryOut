import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';


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


  onLogin() {
    this.authService.login(this.login)
      .subscribe({
        next: (res) => {
          console.log('Login successful', res);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      })
  }


  getProfile() {
    this.authService.profile();
  }
}
