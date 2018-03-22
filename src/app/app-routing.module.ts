import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SelectedUserComponent } from './selected-user/selected-user.component'
import { CreateAccountComponent } from './create-account/create-account.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'selected/:username', component: SelectedUserComponent },
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
