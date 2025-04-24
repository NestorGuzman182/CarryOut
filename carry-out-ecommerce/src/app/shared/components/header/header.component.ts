import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreService } from '../../../core/services/store/store.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  showMenu = false;
  counter = 0;
  userEmail: string | null = null;

  private storeService = inject(StoreService);
  private authService = inject(AuthService);


  ngOnInit() {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    })
    this.authService.profile$.subscribe((profile) => {
      this.userEmail = profile.email;
      console.log(this.userEmail);
    })
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  getProfile() {
    this.authService.profile();
  }

}
