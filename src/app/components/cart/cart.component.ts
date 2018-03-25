import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common'

import { UserService } from '../../user/user.service'
import { ItemService } from '../../item/item.service'
import { Item } from '../../item/item'
import { User } from '../../user/user'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() user: User;

  cart: Item[] = [];
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() { 
    this.user = this.userService.activeUser;
    if(this.user.username === "") {
      this.changeRoute("login");
    }
    this.getCart(this.user.username);
  } 

  getUser(): void {
    const name = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(name)
      .subscribe(user => this.user = user);
  }

  getCart(user: string): void {
    this.itemService.getCartForUser(user)
      .subscribe(
        (response) => {
          let updatedItems = response;
          for(let item of updatedItems) {
            item.imgPath = "assets/" + item.description + ".jpg";
          }
          this.cart = updatedItems;
        });
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

  goBack(): void {
    this.location.back();
  }

  changeRoute(path: string) {
    this.router.navigateByUrl(path);
  }
}
