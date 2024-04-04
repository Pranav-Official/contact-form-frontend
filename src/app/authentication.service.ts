import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4000/api';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  userSignup(user: { email: string; password: string }): Observable<{
    token: string;
    success: boolean;
    refreshToken: string;
    message: string;
  }> {
    return this.http.post<{
      token: string;
      success: boolean;
      refreshToken: string;
      message: string;
    }>(`${baseUrl}/signup`, user);
  }
  userLogin(user: { email: string; password: string }): Observable<{
    token: string;
    success: boolean;
    refreshToken: string;
    message: string;
  }> {
    return this.http.post<{
      token: string;
      success: boolean;
      refreshToken: string;
      message: string;
    }>(`${baseUrl}/login`, user);
  }
}
