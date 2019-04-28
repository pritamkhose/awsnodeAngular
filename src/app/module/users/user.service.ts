import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { User } from './user.model';

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
}

const requestOptions = {
  headers: new Headers(headerDict),
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UserService {

  private para;

  constructor(private http: HttpClient) {
    this.para = '?Database=' + environment.database + '&Collection=customers'
  }

  public getDataList() {
    // https://angular-node-all.herokuapp.com/RestAPIMongoDBAll?Database=nodeMongo&Collection=customers
    return this.http.get(environment.aBaseUrl + 'RestAPIMongoDBAll' + this.para);
  }

  public getDataByID(id: string) {
    // https://angular-node-all.herokuapp.com/RestAPIMongoDB?Database=nodeMongo&Collection=customers&id=5c6eec0733433c28bcd1cff9
    return this.http.get(environment.aBaseUrl + 'RestAPIMongoDB' + this.para + '&id=' + id);
  }

  public createData(data) {
    // console.log(data);
    return this.http.post(environment.aBaseUrl + 'RestAPIMongoDB' + this.para, JSON.stringify(data), httpOptions);
  }

  public updateData(id: string, data) {
    // console.log(id + ' - '+ data);
    return this.http.put(environment.aBaseUrl + 'RestAPIMongoDB' + this.para + '&id=' + id, JSON.stringify(data), httpOptions);
  }

  public deleteData(id: string) {
    //return this.http.delete(this.aBaseUrl + 'customer?email=' + id);
    return this.http.delete(environment.aBaseUrl + 'RestAPIMongoDB' + this.para + '&id=' + id);
  }

}