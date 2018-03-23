import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message.service'
import { Item } from './item';

@Injectable()
export class ItemService {

  private getItemsUrl = "http://localhost:8080/items/getItems";
  private getItemUrl = "http://localhost:8080/items/getItem";
  private addItemsUrl = "http://localhost:8080/items/addItems";
  private addToCartUrl = "http://localhost:8080/items/addToCart";
  
  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  };

  getItems(): Observable<Item[]> {
    this.log(`Fetching items`);
    return this.http.get<Item[]>(this.getItemsUrl)
      .pipe( 
        tap(items => this.log(`Fetched.`)),
        catchError( this.handleError( 'getItems', [] ) ) 
      );
  }

  getItem(name: string): Observable<Item> {
    this.log(`Fetching item name=${name}`);

    const url = this.getItemUrl + name;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`Fetched item name=${name}`)),
      catchError(this.handleError<Item>(`getItem name=${name}`))
    );
  }

  createItem (item: Item): Observable<number> {
    return this.http.post<number>(this.addItemsUrl, item, this.httpOptions).pipe(
      tap(() => this.log(`Added item: ` + item.description)),
      catchError(this.handleError<number>('addUser'))
    );
  }

  addToCart (item: Item): Observable<number> {
    const input: Object = {
      user: "test",
      items: [ item ]
    };
    return this.http.post<number>(this.addToCartUrl, input, this.httpOptions).pipe(
      tap(() => this.log(`Added item to cart: ` + item.description)),
      catchError(this.handleError<number>('addToCart'))
    );
  }

  log(message: string): void {
    this.messageService.add('ItemService: ' + message);
  }

  constructor(
    private http: HttpClient, 
    private messageService: MessageService
  ) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: Better error logging
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
 
}
