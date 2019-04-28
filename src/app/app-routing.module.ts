import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './module/product/product.component';
import { NotificationComponent } from './module/notification/notification.component';
import { UsersComponent } from './module/users/users.component';
import { OrdersComponent } from './module/orders/orders.component';
import { ProductEditComponent } from './module/product/product-edit/product-edit.component';
import { UserEditComponent } from './module/users/user-edit/user-edit.component';
import { LoginComponent } from './module/login/login.component';

// import { CustomerComponent } from './customer/customer.component';
// import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';

const routes: Routes = [
 { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'product/:id', component: ProductEditComponent },
  { path: 'product', component: ProductEditComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserEditComponent },
  { path: 'user', component: UserEditComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'login', component: LoginComponent },

  // { path: 'customers', component: CustomerComponent },
  // { path: 'customer/:id', component: CustomerEditComponent },
  // { path: 'customer', component: CustomerEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
