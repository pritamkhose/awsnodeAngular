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
import { ReportsComponent } from './module/reports/reports.component';

import { LoginComponent } from './module/login/login.component';
import { PasswordforgotComponent } from './module/login/passwordforgot/passwordforgot.component';
import { PasswordresetcodeComponent } from './module/login/passwordresetcode/passwordresetcode.component';
import { SignupComponent } from './module/login/signup/signup.component';

import { CustomerComponent } from './module/customer/customer.component';
import { CustomerEditComponent } from './module/customer/customer-edit/customer-edit.component';

import { DropboxComponent } from './module/dropbox/dropbox.component';
import { DropboxService } from './module/dropbox/dropbox.service';

import { UserService } from './module/users/user.service';
import { ProductService } from './module/product/product.service';
import { CustomerService } from './module/customer/customer.service';
import { OrderService } from './module/orders/order.service';
import { UploadFileService } from './module/orders/upload-file.service';
import { FcmService } from './module/notification/fcm.service';
import { LoginService } from './module/login/login.service';
import { LocalStorageService } from './module/login/local-storage.service';

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
    ReportsComponent,
    DropboxComponent,
    PasswordforgotComponent,
    PasswordresetcodeComponent,
    SignupComponent
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
  providers: [
    UserService,
    ProductService,
    CustomerService,
    OrderService,
    UploadFileService,
    FcmService,
    DropboxService,
    LoginService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
