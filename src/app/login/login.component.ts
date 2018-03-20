import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { USER } from '../mock-users'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  users = USER;
  selectedUser: User;

  selectUser(user): void {
    this.selectedUser = user;
  }


  constructor() { }

  ngOnInit() {
  }

}
