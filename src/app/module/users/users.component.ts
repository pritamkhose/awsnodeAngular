import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  aList: any;

  constructor(private router: Router, private aService: UserService ) { }

  ngOnInit() {
    this.aList = [];
    this.aService.getDataList()
      .subscribe((data: Object) => {
         this.aList = data;
      });
  }

  new() {
    this.router.navigate(['/user/']);
  }

  refresh(){
    this.ngOnInit();
  }

}