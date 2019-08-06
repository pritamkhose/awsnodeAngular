import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LocalStorage, SharedStorage } from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService  {
  @LocalStorage() aList = new Object();
  @LocalStorage() username;
  @LocalStorage() email;
  @LocalStorage() token;

  constructor() {
  }

  public clearAll() {
    this.aList = [];
    this.username = null;
    this.email = null;
    this.token = null;
  }

  public clearLogin() {
    this.username = null;
    this.email = null;
    this.token = null;
  }

  public setLogin(user: string, email: string, token: string) {
    this.username = user;
    this.email = email;
    this.token = token;
  }

  public getUser() {
    return this.username;
  }

  public setUser(user: string) {
    this.username = user;
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getToken() {
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getSaveList() {
    return this.aList;
  }

  public setSaveList(aList: object) {
    this.aList = aList;
  }

  public clearSaveList() {
    this.aList = [];
  }


}
