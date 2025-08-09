import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IAuth } from '../../models/auth.model';
import { ILoginDTO, IUser } from '../../models/user.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL + '/api/v1/auth';
  private http = inject(HttpClient);

  private profileSubject = new BehaviorSubject<IUser | null>(null);
  profile$ = this.profileSubject.asObservable();

  private tokenService = inject(TokenService);

  login(user: ILoginDTO) {
    return this.http.post<IAuth>(`${this.apiUrl}/login`, user).pipe(
      tap((res) => {
        this.tokenService.saveToken(res.access_token);
      })
    );
  }

  loginAndGet(user: ILoginDTO) {
    return this.login(user).pipe(
      switchMap(() =>{
        return this.getProfile()
      }),
    )
  }

  getProfile() {
    return this.http.get<IUser>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${this.tokenService.getToken()}` }
    }).pipe(
      tap((profile) => {
         this.profileSubject.next(profile as IUser)
      })
    )
  }

  logOut() {
    this.tokenService.removeToken();
    this.profileSubject.next(null);
  }

}
