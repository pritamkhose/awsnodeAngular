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

import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  constructor(
    private directrouter: Router,
    private router: ActivatedRoute,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  boardsForm: FormGroup;
  _id = '';
  name = '';
  email = '';
  isCreate = false;
  customerObj: any;

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required]
    });

    const s: any = this.router.snapshot.params.id;
    if (s != null && s.length > 1) {
      this.isCreate = true;
      this.getData(s);
    }
  }

  getData(id: string) {
    this.customerService.getCustomerByID(id).subscribe(data => {
      this.customerObj = data;
      this.boardsForm.setValue({
        name: this.customerObj.name,
        email: this.customerObj.email
      });
    });
  }

  list() {
    this.directrouter.navigate(['/customers']);
  }

  new() {
    this.directrouter.navigate(['/customer/']);
  }

  delete() {
    this.customerService
      .deleteCustomer(this.customerObj.email)
      .subscribe(data => {
        this.list();
      });
  }

  onFormSubmit(form: NgForm) {
    if (this.isCreate) {
      this.customerService
        .updateCustomer(this.customerObj.email, form)
        .subscribe(
          res => {
            this.customerObj = res;
            this.directrouter.navigate(['/customer/', this.customerObj.email]);
            alert('Saved successfully!');
          },
          err => {
            console.log(err);
            alert('Error --> ' + JSON.stringify(err));
          }
        );
    } else {
      this.customerService.createCustomer(form).subscribe(
        res => {
          // console.log(res);
          this.customerObj = res;
          this.isCreate = false;
          this.directrouter.navigate(['/customer/', this.customerObj.email]);
        },
        err => {
          if (err.status === 501) {
            alert('Duplicate Data Entry, Please provide new email');
          } else {
            console.log(err);
            alert('Error --> ' + JSON.stringify(err));
          }
        }
      );
    }
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
