import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRule } from './models/loginInterface.model';
import { NewUser } from './models/userInterface.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { RecoverRule } from './models/recoverInterface.model';
import { PasswordRule } from './models/changePassword.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'https://just-meat-server.herokuapp.com/users';
  token: string;
  isNewUser = true;
  authenticationState = new BehaviorSubject(false);
  decoded: object & { isAdmin: boolean, isRestaurant: boolean, restaurant: string };
  constructor(private httpClient: HttpClient, private router: Router) { }

  public registerUser(newUser: NewUser) {
    this.authenticationState.next(true);
    return this.httpClient.post(`${this.authUrl}/signup`, newUser);
  }

  public loginUser(loginUser: LoginRule) {
    this.authenticationState.next(true);
    return this.httpClient.post<{token: string}>(`${this.authUrl}/login`, loginUser);
  }

  public recoverPassword(emailUser: RecoverRule): Observable<any> {
    this.authenticationState.next(true);
    return this.httpClient.post(`${this.authUrl}/recover`, emailUser);
  }

  public changePassword(newPassword: PasswordRule, token: string): Observable<any> {
    return this.httpClient.post(`${this.authUrl}/reset/${token}`, newPassword);
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  public logoutUser() {
    localStorage.removeItem('token');
    this.authenticationState.next(false);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public checkAdmin(): boolean {
    if (this.loggedIn()) {
      this.token = this.getToken();
      this.decoded = jwt_decode(this.token);
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
  getUser(id: string) {
    return this.httpClient.get<NewUser>(`${this.authUrl}?id=${id}`);
  }
  updateUser(username: string, userId: string, form: FormGroup) {
    const updatedUser = {
      _id : userId,
      username,
      name: form.value.name,
      surname: form.value.surname,
      address: form.value.address,
      phone: form.value.phone,
      email: form.value.email,
    };
    return this.httpClient.put(`${this.authUrl}/${username}`, updatedUser);
  }
}
