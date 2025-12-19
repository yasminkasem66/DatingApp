import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly baseUrl = 'https://localhost:5001';

  constructor(private http: HttpClient) {}

  login(payload: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/account/login`, payload);
  }
}
