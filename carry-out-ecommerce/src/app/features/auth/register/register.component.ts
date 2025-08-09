import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../core/services/users/users.service';
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
    password: '',
    role: 'customer',
    avatar: 'https://i.imgur.com/LDOO4Qs.jpg'
  }

  private usersService = inject(UsersService);


  onRegister() {
    this.createUser();;
  }

  private createUser() {
    this.usersService.create(this.register)
      .subscribe( data => {
        console.log(data);
      })
  }

}
