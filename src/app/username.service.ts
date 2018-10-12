import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class UsernameService {

  private usernameSource = new BehaviorSubject<string>('default username');
  currentUsername = this.usernameSource.asObservable();
  constructor() { }

  changeUsername(username: string) {
    this.usernameSource.next(username);
  }
}
