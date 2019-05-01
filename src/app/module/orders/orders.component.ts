import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from './order.service';

import { UploadFileService } from './upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AppConstants } from '../../app/constants';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  countryArr: any =[];
  stateArr: any =[];
  cityArr: any =[];
  filterCountry = '';
  filterState = '';
  filterCity = '';

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  fileUploads: any; //Observable<string[]>;
  baseURL: any = 'http://ec2-13-233-244-150.ap-south-1.compute.amazonaws.com:8080/';

  constructor(private router: Router, private aService: OrderService, private uploadService: UploadFileService) { }

  ngOnInit() {
    this.countryArr = [];
    this.aService.getCountry()
      .subscribe((data: Object) => {
        // console.log(data);
        this.countryArr = data;
    });
  }

  getState(event) {
    this.stateArr = [];
    this.cityArr = [];
    this.aService.getState(parseInt(event))
      .subscribe((data: Object) => {
        // console.log(data);
        this.stateArr = data;
    });
  }

  getCity(event) {
    this.cityArr = [];
    this.aService.getCity(parseInt(event))
      .subscribe((data: Object) => {
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



}
