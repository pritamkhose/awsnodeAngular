import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', environment.aBaseUrl + 's3uploadFile', formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  getFiles() {
    return this.http.get<[]>(environment.aBaseUrl + 's3ListFile');
  }

  deleteFile(fname: string) {
    return this.http.delete(environment.aBaseUrl + 's3DeleteFile?file=' + fname );
  }
}
