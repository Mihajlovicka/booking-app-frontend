import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegistrationRequestDto,
  UserDto,
} from '../model/user';
import { Path } from '../constant/path.enum';
import { Observable, tap } from 'rxjs';
import { ChangePassword } from '../model/change-password';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: RegistrationRequestDto): Observable<void> {
    return this.http.post<void>(Path.Register, user);
  }

  login(user: LoginRequestDto): Observable<LoginResponseDto | null> {
    return this.http.post<LoginResponseDto>(Path.Login, user).pipe(
      tap((result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.user.role);
      })
    );
  }

  save(user: any) {
    return this.http.post<UserDto>(Path.User, user);
  }

  changePassword(value: ChangePassword): Observable<void> {
    return this.http.post<void>(Path.ChangePassword, value);
  }

  getLogged(): Observable<UserDto> {
    return this.http.get<UserDto>(`${Path.User}`);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
