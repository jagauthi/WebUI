import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  users: User[];
  selectedUser: User;

  selectUser(user): void {
    this.selectedUser = user;
  }

  getUsers(): void{
    this.userService.getUsers().subscribe(users => this.users = users);
  } 

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

}
