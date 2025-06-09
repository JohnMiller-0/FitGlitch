import {Inject, Injectable} from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { LoginPayload } from '../models/LoginPayload';
import { AuthorizationService } from './authorization';


import { AuthResponse } from '../models/authResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private authService: AuthorizationService ) {};
 
  private getToken(): string {
    return this.storage.getItem('fG-token');
  }

  private saveToken(token: string): void {
    this.storage.setItem('fG-token', token);
  }

  public login(loginPayload: LoginPayload): Promise<any> {
    return this.authService.login(loginPayload)
        .then((response: AuthResponse) => 
            this.saveToken(response.token))
    }
    
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if(token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      const expiration = new Date(payload.exp * 1000); // Convert expiration time from seconds to milliseconds
      return expiration > Date.now() // Check if the token is still valid
    }

  }

