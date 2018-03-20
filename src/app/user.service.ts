import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { User } from './user';
import { USERS } from './mock-users';
import { MessageService } from './message.service'

@Injectable()
export class UserService {

  getUsers(): Observable<User[]> {
    this.messageService.add('UserService fetched heroes!');
    return of(USERS);
  }

  constructor(private messageService: MessageService) { }

}
