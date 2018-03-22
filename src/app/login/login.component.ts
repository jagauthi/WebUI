import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  getUsers(): void{
    this.userService.getUsers().subscribe(users => {});
  }

  login(name: string, pass: string): void {
    name = name.trim();
    pass = pass.trim();
    if (!name || !pass) { return; }
    const input = { userId: 1, username: name, password: pass } as User;
    this.userService.login(input)
      .subscribe(response => {
        if(response.username === name) {
          //Login successful
          this.changeRoute("dashboard");
        }
        else {
          //Login fail
        }
      });
  }

  delete(user: User): void {
    this.userService.deleteUser(user).subscribe(
      (numResults) => {}
    );
  }

  changeRoute(path: string) {
    this.router.navigateByUrl(path);
  }

  constructor(  
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

}
