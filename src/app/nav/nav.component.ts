import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../module/login/local-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public loginUserName: string;
  public isValidLogin: boolean = false;

  constructor(
    private router: Router,
    private aLocalStorageService: LocalStorageService
  ) {
    aLocalStorageService.changeEmitted$.subscribe(
      text => {
        if (text != null) {
          this.isValidLogin = true;
          this.loginUserName = text.toString();
        }
      });
  }

  ngOnInit() {
    let a = this.aLocalStorageService.getUser();
    if (a != undefined && a != null && a.trim().length > 1) {
      this.isValidLogin = true;
      this.loginUserName = a;
    }
  }


  public onUpdateUserName(loginUserName: string) {
    this.isValidLogin = true;
    this.loginUserName = loginUserName;
  }

  public logout() {
    this.isValidLogin = false;
    this.aLocalStorageService.clearLogin();
    this.router.navigate(['/login/']);
  }

}