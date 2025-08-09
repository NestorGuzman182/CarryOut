import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { TokenService } from './core/services/token/token.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent implements OnInit {
  title = 'carry-out-ecommerce';

  private tokenService = inject(TokenService);
  private authService = inject(AuthService);

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe()
    }
  }
}
