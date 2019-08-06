import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  ValidationErrors
} from '@angular/forms';

import { MyErrorStateMatcher } from '../../util/myerror-state-matcher';
import { LoginService } from '../login.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-passwordresetcode',
  templateUrl: './passwordresetcode.component.html',
  styleUrls: ['../login.component.css']
})
export class PasswordresetcodeComponent implements OnInit {

  aForm: FormGroup;
  email = '';
  username = '';
  password = '';
  repeatpassword = '';
  resetcode = '';
  message = '';
  aObj: any;
  matcher = new MyErrorStateMatcher();


  constructor(
    private router: Router,
    private aService: LoginService,
    private aLocalStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.aForm = this.formBuilder.group({
      password: [null, Validators.required],
      repeatpassword: [null, Validators.required],
      resetcode: [null, Validators.required], // Validators.pattern('[0-9]+')
    }
      ,{ validator: this.MatchConfirom('password', 'repeatpassword')}
    );
    var a = this.aLocalStorageService.getUser();
    if (a != undefined && a != null && a.trim().length > 1) {
      this.username = a;
    }
    var a = this.aLocalStorageService.getEmail();
    if (a != undefined && a != null && a.trim().length > 1) {
      this.email = a;
    }
  }

  // https://stackoverflow.com/questions/48397251/how-to-check-if-2-fields-are-equal-in-angular-4
  private MatchConfirom(type1: any, type2: any) {

    return (checkForm: FormGroup) => {
      let value1 = checkForm.controls[type1];
      let value2 = checkForm.controls[type2];

      if (value1.value === value2.value) {
        return value2.setErrors(null);
      } else {
        return value2.setErrors({ notEquivalent: true });
      }
    };
  }

  onFormSubmit(form: NgForm) {
    var aobj = {
      username: this.username,
      email: this.email,
      password: form['password'],
      resetcode: parseInt(form['resetcode']),
    };
    // console.log(aobj);
    this.aService
      .setNewPassword(aobj)
      .subscribe(
        (data: any) => {
          if (data.message != null) {
            this.message = data.message;
            if(data.message ==='New password is set, Go ahead for Login.') {
               this.router.navigate(['/login/']);
            }
          } else {
            this.message = data.error;
          }
        },
        err => {
          console.error(JSON.stringify(err));
          alert('Something Went wrong!');
        }
      );
  }

}
