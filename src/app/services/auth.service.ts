import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44327/api/account';

  constructor(private http: HttpClient) {}

  login(model: LoginModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, model);
  }

  createUser(model: RegisterModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, model);
  }
}
