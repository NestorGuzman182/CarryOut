import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  register = {
    name: '',
    email: '',
    password: ''
  }

/*   validField(field: string) {
    return this.register[field].length > 3
  } */

  onRegister() {
    console.log('Enviando...');
  }
}
