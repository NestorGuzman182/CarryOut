import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IAuth } from '../../models/auth.model';
import { ILoginDTO, IUser } from '../../models/user.model';
import { BehaviorSubject, tap } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL + '/api/v1/auth';
  private http = inject(HttpClient);

  private profileSubject = new BehaviorSubject<IUser>({} as IUser);
  profile$ = this.profileSubject.asObservable();

  private tokenService = inject(TokenService);
  //private token = '';

  login(user: ILoginDTO) {
    return this.http.post<IAuth>(`${this.apiUrl}/login`, user).pipe(
      tap((res) => {
        this.tokenService.saveToken(res.access_token);
        this.profile();
      })
    );
  }

  profile() {
    return this.http.get(`${this.apiUrl}/profile`, {
      //headers: { Authorization: `Bearer ${this.tokenService.getToken()}` }
    })
    .subscribe((res) => {
      this.profileSubject.next(res as IUser);
    });
  }

/*   getToken() {
    return this.token;
  } */

}
