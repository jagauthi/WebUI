import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { ItemService } from '../../item/item.service';
import { Item } from '../../item/item';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  items: Item[] = [];
 
  constructor(private itemService: ItemService) { }
 
  ngOnInit() {
    this.getItems();
  }
 
  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }

  addToCart(item: Item): void {
    this.itemService.addToCart(item)
      .subscribe();
  }
}