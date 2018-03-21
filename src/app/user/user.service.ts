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
  private getUserUrl= "http://localhost:8080/getAccount?username=";
  private updateUserUrl= "http://localhost:8080/updateAccount";
  private addUserUrl = 'http://localhost:8080/addAccount'
  private deleteUserUrl = 'http://localhost:8080/deleteAccount?username='

  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  };

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
      catchError(this.handleError<User>(`getUser name=${name}`))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put(this.updateUserUrl, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user name=${user.userId}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  addUser (user: User): Observable<number> {
    return this.http.post<number>(this.addUserUrl, user, this.httpOptions).pipe(
      tap(() => this.log(`Added user: ` + user.username)),
      catchError(this.handleError<number>('addUser'))
    );
  }

  deleteUser (user: User): Observable<number> {
    const url = this.deleteUserUrl + user.username;
    return this.http.get<number>(url).pipe(
      tap(() => this.log(`Deleted user name=${user.username}`)),
      catchError(this.handleError<number>(`deleteUser name=${user.username}`))
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
