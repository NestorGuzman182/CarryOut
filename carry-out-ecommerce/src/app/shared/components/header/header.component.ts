import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreService } from '../../../core/services/store/store.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private storeService = inject(StoreService);
  showMenu = false;
  counter = 0;

  ngOnInit() {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    })
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
