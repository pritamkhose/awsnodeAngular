import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../module/login/login.service';
import { LocalStorageService } from '../module/login/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = '';

  constructor(
    private router: Router,
    private aService: LoginService,
    private aLocalStorageService: LocalStorageService
  ) { }


  ngOnInit() {
      this.aService.getUserInfo()
        .subscribe(
          (data: any) => {
            // console.log((data));
            if (data !=  null) {
              this.message = data.user.email + '\n' + JSON.stringify(data.user);
            } else {
              this.message = 'No User Logged!';
            }
          },
          err => {
            console.error(JSON.stringify(err));
            alert('Something Went wrong!');
            this.message = 'Something Went wrong!';
            this.aLocalStorageService.clearLogin();
            this.router.navigate(['/login/']);
          }
        );
    }
}
