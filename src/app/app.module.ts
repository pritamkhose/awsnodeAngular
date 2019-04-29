import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ProductComponent } from './module/product/product.component';
import { NotificationComponent } from './module/notification/notification.component';
import { UsersComponent } from './module/users/users.component';
import { OrdersComponent } from './module/orders/orders.component';
import { ProductEditComponent } from './module/product/product-edit/product-edit.component';
import { UserEditComponent } from './module/users/user-edit/user-edit.component';
import { LoginComponent } from './module/login/login.component';
import { ReportsComponent } from './module/reports/reports.component';

import { CustomerComponent } from './module/customer/customer.component';
import { CustomerEditComponent } from './module/customer/customer-edit/customer-edit.component';

import { UserService } from './module/users/user.service';
import { ProductService } from './module/product/product.service';
import { CustomerService } from './module/customer/customer.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerEditComponent,
    HomeComponent,
    NavComponent,
    ProductComponent,
    NotificationComponent,
    UsersComponent,
    OrdersComponent,
    ProductEditComponent,
    UserEditComponent,
    LoginComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ UserService, ProductService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
