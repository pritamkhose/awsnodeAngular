import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from './order.service';

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

  constructor(private router: Router, private aService: OrderService) { }

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


}
