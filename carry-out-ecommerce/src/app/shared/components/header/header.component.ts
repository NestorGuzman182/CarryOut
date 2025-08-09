import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../../core/services/store/store.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../core/models/user.model';

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
  profile: IUser | null = null;
  userEmail: string | null = null;

  private storeService = inject(StoreService);
  private authService = inject(AuthService);
  private router = inject(Router)


  ngOnInit() {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    })
    this.authService.profile$.subscribe((profile) => {
      if (profile) {
        this.userEmail = profile.email;
      }
    })
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  getProfile() {
    this.authService.getProfile();
  }

  logOut() {
    this.authService.logOut();
    this.userEmail = null;
    this.router.navigate(['/auth'])
  }

}
