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

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { MyErrorStateMatcher } from '../../util/myerror-state-matcher';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(
    private directrouter: Router,
    private router: ActivatedRoute,
    private aService: ProductService,
    private formBuilder: FormBuilder
  ) { }

  productForm: FormGroup;
  _id = '';
  name = '';
  brand = '';
  price;
  discount;
  description;
  image;

  aObj: any;
  matcher = new MyErrorStateMatcher();
  isSaved = false;
  totalPrice = 0;

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      price: [null, Validators.required],
      // discount: [null, Validators.nullValidator],
       discount: (this.aObj.discount !== undefined) ? this.aObj.discount : null,
      description: [null, Validators.required],
      // specifications:[null, Validators.nullValidator],
      image: [null, Validators.required],
      // email: [null, Validators.required]
    });

    if (this.router.snapshot.url.length === 2) {
      this.isSaved = true;
      this.getData(this.router.snapshot.url[1].path);
    }
  }

  updateTotalPrice() {
    if (this.price !== undefined) {
      let d = this.discount;
      if (d === undefined) {
        d = 0;
      }
      this.totalPrice = this.price - d;
      if (this.totalPrice < 0) {
        alert('Invalid discount');
        this.discount = 0;
        this.updateTotalPrice();
      }
    } else {
      this.totalPrice = 0;
    }

  }

  getData(id: string) {
    this.aService.getDataByID(id).subscribe(data => {
      this.aObj = data[0];
      // console.log(this.aObj);
      this.productForm.setValue({
        name: this.aObj.name,
        brand: this.aObj.brand,
        description: this.aObj.description,
        price: this.aObj.price,
        discount: this.aObj.discount,
        image: this.aObj.image
      });
    },
      err => {
        alert('Invalid Data Found!');
        this.directrouter.navigate(['/products']);
      }
    );
  }

  list() {
    this.directrouter.navigate(['/products']);
  }

  new() {
    this.directrouter.navigate(['/product/']);
  }

  delete() {
    this.directrouter.navigate(['/products']);
    this.aService
      .deleteData(this.aObj._id)
      .subscribe(
        res => {
          console.log('Deleted Suceefully --> ' + JSON.stringify(res));
        },
        err => {
          console.error(JSON.stringify(err));
          alert('Something Went wring!');
          this.directrouter.navigate(['/product/', this.aObj._id]);
        }
      );
  }

  onFormSubmit(form: NgForm) {
    // console.log(form);
      if (this.isSaved) {
        this.aService
          .updateData(this.aObj._id, form)
          .subscribe(
            res => {
              this.directrouter.navigate(['/product/', this.aObj._id]);
            },
            err => {
              console.error(JSON.stringify(err));
              alert('Something Went wring!');
            }
          );
      } else {
        this.aService.createData(form).subscribe(
          res => {
            // console.log(res);
            this.isSaved = false;
            // this.directrouter.navigate(['/product/', res.insertedIds[0]]);
            const cID = res['insertedIds'][0];
            console.log(cID);
            this.directrouter.navigate(['/product/', cID]);
          },
          err => {
            if (err.status === 500) {
              alert('Duplicate Data Entry, Please provide new email');
            } else {
              console.error(JSON.stringify(err));
              alert('Something Went wring!');
            }
          }
         );
       }
  }
}

