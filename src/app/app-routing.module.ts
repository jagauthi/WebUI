import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { SelectedUserComponent } from './components/selected-user/selected-user.component'
import { CreateAccountComponent } from './components/create-account/create-account.component'
import { CartComponent } from './components/cart/cart.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart/:username', component: CartComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
