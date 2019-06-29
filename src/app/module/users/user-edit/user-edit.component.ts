import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';

import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
// import { AlertsService } from 'angular-alert-module';

import { User } from '../user.model';
import { UserService } from '../user.service';
import { MyErrorStateMatcher } from '../../util/myerror-state-matcher';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(
    private directrouter: Router,
    private router: ActivatedRoute,
    private aService: UserService,
    private formBuilder: FormBuilder
  ) { }

  boardsForm: FormGroup;
  _id = '';
  name = '';
  email = '';
  isSaved = false;
  aObj: any;
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required]
    });

    if (this.router.snapshot.url.length === 2) {
      this.isSaved = true;
      this.getData(this.router.snapshot.url[1].path);
    }
  }

  getData(id: string) {
    this.aService.getDataByID(id).subscribe(data => {
      this.aObj = data[0];
      // console.log(this.aObj);
      this.boardsForm.setValue({
        name: this.aObj.name,
        email: this.aObj.email
      });
    },
      err => {
        // console.error(JSON.stringify(err));
        // if (err.status === 503) {
          alert('Invalid Data Found!');
        // } else {
        //   alert('Something Went wrong!');
        // }
          this.directrouter.navigate(['/users']);
      }
    );
  }

  list() {
    this.directrouter.navigate(['/users']);
  }

  new() {
    this.directrouter.navigate(['/user/']);
  }

  delete() {
    this.directrouter.navigate(['/users']);
    this.aService
      .deleteData(this.aObj._id)
      .subscribe(
        res => {
          console.log('Deleted Suceefully --> ' + JSON.stringify(res));
        },
        err => {
          console.error(JSON.stringify(err));
          alert('Something Went wrong!');
          this.directrouter.navigate(['/user/', this.aObj._id]);
        }
      );
  }

  onFormSubmit(form: NgForm) {
    if (this.isSaved) {
      this.aService
        .updateData(this.aObj._id, form)
        .subscribe(
          res => {
            this.directrouter.navigate(['/user/', this.aObj._id]);
          },
          err => {
            console.error(JSON.stringify(err));
            alert('Something Went wrong!');
          }
        );
    } else {
      this.aService.createData(form).subscribe(
        res => {
          // console.log(res);
          this.isSaved = false;
          const cID = res['insertedIds'][0];
          this.directrouter.navigate(['/user/', cID]);
        },
        err => {
          if (err.status === 500) {
            alert('Duplicate Data Entry, Please provide new email');
          } else {
            console.error(JSON.stringify(err));
            alert('Something Went wrong!');
          }
        }
      );
    }
  }
}
