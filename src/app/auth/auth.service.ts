import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRule } from './models/loginInterface.model';
import { NewUser } from './models/userInterface.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'http://localhost:3006/users';
  token: string;
  decoded: object & { isAdmin: boolean, isRestaurant: boolean, restaurant: string };
  constructor(private httpClient: HttpClient, private router: Router) { }

  public registerUser(newUser: NewUser) {
    return this.httpClient.post<NewUser & {token: string}>(`${this.authUrl}/`, newUser);
  }

  public loginUser(loginUser: LoginRule) {
    return this.httpClient.post<LoginRule & {token: string}>(`${this.authUrl}/login`, loginUser);
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public checkAdmin(): boolean {
    if (this.loggedIn()) {
      this.token = this.getToken();
      this.decoded = jwt_decode(this.token, {header: true});
      if (this.decoded.isAdmin === true ) {
        return true;
      }
    }
    return false;
  }

  public isRestaurant(): boolean {
    if (this.loggedIn()) {
      this.token = this.getToken();
      this.decoded = jwt_decode(this.token);
      if (this.decoded.isRestaurant === true ) {
        return true;
      }
    }
    return false;
  }
}
