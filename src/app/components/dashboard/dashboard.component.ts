import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../user/user';
import { ItemService } from '../../item/item.service';
import { Item } from '../../item/item';
import { UserService } from '../../user/user.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  catalog: Item[];
  cart: Item[];  
  user: User;
 
  constructor(
    private userService: UserService,
    private itemService: ItemService,
    private router: Router
  ) { }
 
  ngOnInit() {
    this.user = this.userService.activeUser;
    this.catalog = this.itemService.catalog;
    this.cart = this.itemService.cart;
    if(this.user.username === "") {
      this.changeRoute("login");
    }
    if(this.catalog === undefined) {
      this.getItems();
    }
    if(this.cart === undefined) {
      this.getCart(this.user.username);
    }
  }
 
  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => {
        this.catalog = items;
      });
  }
 
  getCart(user: string): void {
    this.itemService.getCartForUser(user)
      .subscribe(
        (response) => {
          this.cart = response;
        });
  }

  addToCart(item: Item): void {
    this.itemService.addToCart(this.user.username, item)
    .subscribe(
      (response) => {
        if(typeof(response) === "number") {
          if(response === 0) {

          }
          else {
            this.cart.push(item);
          }
        }
      }
    );
  }

  removeFromCart(item: Item): void {
    this.itemService.removeFromCart(this.user.username, item)
    .subscribe(
      (response) => {
        if(response.length === 0 || response[0].itemNumber != 0) {
          this.cart = response;
        }
      }
    );
  }

  getImgPath(item: Item): string {
    return "assets/" + item.description + ".jpg";
  }

  goToCart(): void {
    this.changeRoute("cart/" + this.user.username);
  }

  changeRoute(path: string) {
    this.router.navigateByUrl(path);
  }
}