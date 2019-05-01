import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AppConstants } from '../../app/constants';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  baseURL = 'http://ec2-13-233-244-150.ap-south-1.compute.amazonaws.com:8080/';

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.baseURL + 'localstorage/uploadFile', formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(AppConstants.baseURL + 'localstorage/listFiles');
  // }

  getFiles() {
    return this.http.get<[]>(this.baseURL + 'localstorage/listFiles');
  }
}
