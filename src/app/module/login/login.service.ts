import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public setLogin(data) {
    return this.http.post(
      environment.aBaseUrl + 'users/login',
      JSON.stringify(data),
      httpOptions
    );
  }

  public setNewPassword(data) {
    return this.http.post(
      environment.aBaseUrl + 'users/setNewPassword',
      JSON.stringify(data),
      httpOptions
    );
  }

  public forgotPassword(data) {
    return this.http.post(
      environment.aBaseUrl + 'users/forgotPassword',
      JSON.stringify(data),
      httpOptions
    );
  }

  public setRegister(data) {
    return this.http.post(
      environment.aBaseUrl + 'users/register',
      JSON.stringify(data),
      httpOptions
    );
  }

  public getUserInfo(data) {
    let token = '';

    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: 'Token ' + token
    };

    const requestOptions = {
      // headers: new Headers(headerDict),
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get(
      environment.aBaseUrl + 'users/current',
      requestOptions
    );
  }
}
