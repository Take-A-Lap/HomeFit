import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-successful',
  templateUrl: './reset-successful.component.html',
  styleUrls: ['./reset-successful.component.css']
})
export class ResetSuccessfulComponent implements OnInit {

  email: string;

  constructor() { }

  destroyCookie(name) {
    return new Promise((resolve, reject) => {
      document.cookie = name +
        '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
      if (document.cookie !== '') {
        reject('Could not delete cookie')
      } else {
        resolve('success')
      }
    })
  }

  returnToLogin() {
    const cookie = document.cookie;
    if (cookie) {
      this.destroyCookie(cookie);
    }
  }
  ngOnInit() {
    this.returnToLogin();
  }

}
