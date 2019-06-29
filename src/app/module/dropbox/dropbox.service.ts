import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  constructor(private http: HttpClient) {}

  private aBaseUrl = environment.aBaseUrl;

  public getdriveFileList(folderName) {
    console.log('get drive File List --> ' + this.aBaseUrl + 'dropboxListFiles?folder=' + folderName);
    return this.http.get(this.aBaseUrl + 'dropboxListFiles?folder=' + folderName);
  }

  public getdriveDeleteFile(fileName) {
    console.log('get drive File Delete --> ' + this.aBaseUrl + 'dropboxDelete?fileName=' + fileName);
    return this.http.delete(this.aBaseUrl + 'dropboxDelete?fileName=' + fileName);
  }

}
