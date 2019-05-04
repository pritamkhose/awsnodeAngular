import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from './order.service';

import { UploadFileService } from './upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  countryArr: any = [];
  stateArr: any = [];
  cityArr: any = [];
  filterCountry = '';
  filterState = '';
  filterCity = '';
  isCountryLoading = true;
  isStateLoading = false;
  isCityLoading = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  fileUploads: any; // Observable<string[]>;
  baseURL: any = environment.aBaseUrl;

  constructor(private router: Router, private aService: OrderService, private uploadService: UploadFileService) { }

  ngOnInit() {
    this.getCountry();
    this.uploadlist();
  }

  getCountry() {
    this.countryArr = [];
    this.isCountryLoading = true;
    this.aService.getCountry()
      .subscribe((data: Object) => {
        this.isCountryLoading = false;
        // console.log(data);
        this.countryArr = data;
      });
  }

  getState(event) {
    // var option = this.ui.attributeList.find("[value='" + event + "']");
    //  var id = event.attributes['data-id'].value; // 345
    // console.log(id);
    let id;
    for (let m = 0; m < this.countryArr.length; m++) {
      if (event === this.countryArr[m].name) {
        id = this.countryArr[m].id;
        break;
      }
    }

    this.stateArr = [];
    this.cityArr = [];
    this.isStateLoading = true;
    this.aService.getState(parseInt(id))
      .subscribe((data: Object) => {
        this.isStateLoading = false;
        console.log(data);
        this.stateArr = data;
      });
  }

  getCity(event) {
    let id;
    for (let m = 0; m < this.stateArr.length; m++) {
      if (event === this.stateArr[m].name) {
        id = this.stateArr[m].id;
        break;
      }
    }

    this.cityArr = [];
    this.filterCity = '';
    this.isCityLoading = true;
    this.aService.getCity(parseInt(id))
      .subscribe((data: Object) => {
        this.isCityLoading = false;
        // console.log(data);
        this.cityArr = data;
      });
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');

        this.progress.percentage = 0;
        this.currentFileUpload = undefined;
        this.selectedFiles = undefined;
        this.uploadlist();
      }
    });

    this.selectedFiles = undefined;
  }

  uploadlist() {
    this.fileUploads = this.uploadService.getFiles();
  }


  deletefile(dfile) {
    this.fileUploads = this.uploadService.deleteFile(dfile);
   // this.uploadlist();
  }


}
