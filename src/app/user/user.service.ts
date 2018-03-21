import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { USERS } from './mock-users';
import { MessageService } from '../message.service'

@Injectable()
export class UserService {

  private usersUrl = "http://localhost:8080/getAccounts";
  private getUserUrl= "http://localhost:8080/getAccount?user=";

  getUsers(): Observable<User[]> {
    this.log(`Fetching users`);
    return this.http.get<User[]>(this.usersUrl)
      .pipe( 
        tap(users => this.log(`Fetched.`)),
        catchError( this.handleError( 'getAccounts', [] ) ) 
      );
  }

  getUser(name: string): Observable<User> {
    this.log(`Fetching user name=${name}`);

    const url = `${this.getUserUrl}${name}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`Fetched user name=${name}`)),
      catchError(this.handleError<User>(`getHero name=${name}`))
    );
  }

  log(message: string): void {
    this.messageService.add('UserService: ' + message);
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
