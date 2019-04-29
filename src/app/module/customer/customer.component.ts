import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  name = 'Angular';
  customerList: any;

  constructor(private router: Router, private aService: CustomerService ) { }

  ngOnInit() {
    this.customerList = [];
    this.aService.getCustomereList()
      .subscribe((data: Object) => {
        this.customerList = data;
      });
  }

  new() {
    this.router.navigate(['/customer/']);
  }

}
