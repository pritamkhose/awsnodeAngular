import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
};

const requestOptions = {
  headers: new Headers(headerDict),
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  data: any;
  constructor(private http: HttpClient) {}

  public getCountry() {
    this.data = {
      'projection': {
        'projection': {
          'id': 1,
          '_id': 0,
          'name': 1
        }
      },
      'limit' : 300
    };
    return this.http.post(environment.aBaseUrl + 'RestAPIMongoDB-AdvSearch' +
    '?Database=' + environment.database + '&Collection=area_countries',
    JSON.stringify(this.data), httpOptions);
  }

  public getState(country_id: number) {
    this.data = {
      'projection': {
        'projection': {
          'id': 1,
          '_id': 0,
          'name': 1
        }
      },
      'search': {
        'country_id': country_id
      },
      'limit' : 500
    };
    return this.http.post(environment.aBaseUrl + 'RestAPIMongoDB-AdvSearch' +
    '?Database=' + environment.database + '&Collection=area_states',
    JSON.stringify(this.data), httpOptions);
  }

  public getCity(state_id: number) {
    this.data = {
      'projection': {
        'projection': {
          'id': 1,
          '_id': 0,
          'name': 1
        }
      },
      'search': {
        'state_id': state_id
      },
      'limit' : 500
    };
    return this.http.post(environment.aBaseUrl + 'RestAPIMongoDB-AdvSearch' +
    '?Database=' + environment.database + '&Collection=area_cities',
    JSON.stringify(this.data), httpOptions);
  }

}
