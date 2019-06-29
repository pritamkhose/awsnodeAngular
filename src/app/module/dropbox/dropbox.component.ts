import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { DropboxService } from './dropbox.service';

@Component({
  selector: 'app-dropbox',
  templateUrl: './dropbox.component.html',
  styleUrls: ['./dropbox.component.css']
})
export class DropboxComponent implements OnInit {
  driveFileList: any;
  private aBaseUrl = environment.aBaseUrl;
  pathArr = [];

  constructor(private router: Router, private aService: DropboxService) {}

  ngOnInit() {
    this.driveFileList = [];
    this.getdriveFileList(null);
  }

  getdriveFileList(dataObj: Object) {
    let folderName = '';
    if (dataObj === null) {
      this.pathArr = [];
      this.pathArr.push({name: './', path: ''});
    } else {
      // this.pathArr.push({name: dataObj['name'], path: dataObj['path_display']});
      folderName = dataObj['path_display'];
      const tempArr = folderName.split('/');
      this.pathArr = [];
      // for (let tempName of tempArr) {
      for (let i = 0; i < tempArr.length; i++) {
        let tempName = tempArr[i];
        if (tempName === '') {
          tempName = './';
        }
        let c = folderName.split('/', i + 1).join();
        // console.log(i + '--> ' + c.replace(new RegExp(',', 'g'), '/')) ;
        this.pathArr.push({
          name: tempName,
          path: c.replace(new RegExp(',', 'g'), '/')
        });
      }
    }
    // console.log(this.pathArr);
    // console.log(folderName);
    this.aService.getdriveFileList(folderName).subscribe((data: Object) => {
      this.driveFileList = data;
    });
  }

  selectpath(pathObj) {
    let str: any = pathObj['path'].substring(1);
    console.log('selectpath ' + str);
    if(str === '') {
      this.getdriveFileList(null);
    } else {
      this.getdriveFileList({ path_display: '/' + str });
    }
  }

  dropboxDownloadFileName(dataObj: Object) {
    if (dataObj['.tag'] === 'folder') {
      this.getdriveFileList(dataObj);
    } else if (dataObj['.tag'] === 'file') {
      window.location.href =
        this.aBaseUrl + 'dropboxDownload?fileName=' + dataObj['name'];
    } else {
      alert(
        'Something Went wrong with to download ' + dataObj['name'] + 'file!'
      );
    }
  }

  upload() {
    this.router.navigate(['/dropboxFiles/']);
  }
}
