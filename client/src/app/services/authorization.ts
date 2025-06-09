import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { AuthResponse } from '../models/authResponse';
import { LoginPayload } from '../models/LoginPayload';
import { RegisterPayload } from '../models/RegisterPayload';

import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(
    private http: HttpClient
  ) {}

  private apiBaseUrl = 'http://localhost:3000/api';

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private async makeApiCall(urlPath: string, payload: LoginPayload | RegisterPayload): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    try {
        return await lastValueFrom(this.http.post<AuthResponse>(url, payload) );
    } catch (error) {
        return this.handleError(error);
    }
  }

  public login(loginPayload: LoginPayload): Promise<AuthResponse> {
    return this.makeApiCall('login', loginPayload);
  }

  public register(registerPayload: RegisterPayload): Promise<AuthResponse> {
    return this.makeApiCall('register', registerPayload);
  }

}