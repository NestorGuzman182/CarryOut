import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from "./login/login.component";
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { OnExit } from '../../core/guards/exit.guard';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RegisterComponent, LoginComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-200%)' }),
        animate('300ms linear', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms linear', style({ opacity: 0, transform: 'translateX(200%)' }))
      ])
    ])
  ]
})
export default class AuthComponent implements OnExit {
  isRegisterMode = false;

  onExit() {
    if (this.isRegisterMode) {
      const rta = confirm('Se va caballero?');
      return rta;
    }
    return true;
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }
}
