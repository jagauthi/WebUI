import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const input = { userId: 1, username: name, password: 'asdf', email:'asdf' } as User;
    this.userService.addUser(input)
      .subscribe(message => {
        this.users.push(input);
      });
  }

  delete(user: User): void {
    this.userService.deleteUser(user).subscribe(
      () => {this.users = this.users.filter(u => u !== user);}
    );
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

}
