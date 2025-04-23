import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IUser, ICreateUserDTO } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.API_URL + '/api/v1/users/';
  private http = inject(HttpClient);

  create(user: ICreateUserDTO) {
    return this.http.post<IUser>(this.apiUrl, user);
  }

  getAll() {
    return this.http.get<IUser[]>(this.apiUrl);
  }

}
