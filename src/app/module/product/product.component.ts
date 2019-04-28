import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  aList: any;

  constructor(private router: Router, private aService: ProductService) { }

  ngOnInit() {
    this.aList = [];
    this.aService.getDataList()
      .subscribe((data: Object) => {
        console.log(data);
        this.aList = data;
      });
  }

  new() {
    this.router.navigate(['/product/']);
  }

  refresh() {
    this.ngOnInit();
  }

  OnClickEvent(aObj: Product, index: number) {
    this.router.navigate(['/product/', aObj._id]);
  }

}