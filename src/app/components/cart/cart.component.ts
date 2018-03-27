import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common'

import { UserService } from '../../user/user.service'
import { ItemService } from '../../item/item.service'
import { Item } from '../../item/item'
import { CartItem } from '../../item/cartItem'
import { User } from '../../user/user'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() user: User;

  cart: CartItem[];
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() { 
    this.user = this.userService.activeUser;
    this.cart = this.itemService.cart;
    this.cart.sort(this.cartSort);
    if(this.user.username === "") {
      this.changeRoute("login");
    }
    if(this.cart === undefined) {
      this.getCart(this.user.username);
    }
  } 

  cartSort(item1: CartItem, item2: CartItem): number { 
    if(item1.item.itemNumber > item2.item.itemNumber)
      return 1;
    else if (item1.item.itemNumber < item2.item.itemNumber) {
      return -1;
    }
    else {
      return 0;
    }
  }

  getCart(user: string): void {
    this.itemService.getCartForUser(user)
      .subscribe(
        (response) => {
          this.cart = response;
        });
  }

  removeFromCart(item: Item, quantity: number): void {
    this.itemService.removeFromCart(this.user.username, item, quantity)
    .subscribe(
      (response) => {
        if(response.length === 0 || response[0].item.itemNumber != 0) {
          this.cart = response;
        }
      }
    );
  }

  increaseQuantity(item: Item, quantity: number): void {
    this.itemService.addToCart(this.user.username, item, quantity)
    .subscribe(
      (response) => {
        if(typeof(response) === "number") {
          if(response === 0) {

          }
          else {
            this.cart.push(
              {
                item: {
                  itemNumber:item.itemNumber,
                  price: item.price,
                  description: item.description,
                  category: item.category
                },
                quantity: quantity
              } as CartItem
            );
          }
        }
      }
    );
  }

  getImgPath(item: Item): string {
    return "assets/" + item.description + ".jpg";
  }

  getTotalPrice(): number {
    let totalPrice = 0.0;
    for(let item of this.cart) {
      totalPrice += item.item.price;
    }
    return totalPrice;
  }

  goBack(): void {
    this.location.back();
  }

  changeRoute(path: string) {
    this.router.navigateByUrl(path);
  }
}
