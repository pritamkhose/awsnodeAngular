import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Customer } from './customer.model';

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const requestOptions = {
  headers: new Headers(headerDict),
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {}

  private aBaseUrl = environment.database + 'RestAPI-';

  public getCustomereList() {
    console.log('get List --> ' + this.aBaseUrl + 'customers');
    return this.http.get(this.aBaseUrl + 'customers');
  }

  public getCustomerByID(id: string ){
    console.log('get Obj --> ' + this.aBaseUrl + 'customer?email=' + id);
    return this.http.get(this.aBaseUrl + 'customer?email=' + id);
  }

   public createCustomer(data) {
    console.log(data);
    return this.http.post(this.aBaseUrl + 'customer', JSON.stringify(data) , httpOptions);
  }

   public updateCustomer(id: string, data) {
    console.log(data);
    return this.http.put(this.aBaseUrl+ 'customer?email=' + id, JSON.stringify(data) , httpOptions);
  }

  public deleteCustomer(id: string ){
    console.log('delete Obj --> ' + this.aBaseUrl + 'customer?email=' + id);
    return this.http.delete(this.aBaseUrl + 'customer?email=' + id);
  }

}
