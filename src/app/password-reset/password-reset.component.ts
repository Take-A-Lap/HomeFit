import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  userInfo: any;
  email: string;
  password: string;
  password2: string;

  constructor(private httpClient: HttpClient) { }

  getCookieInfo() {
    return new Promise((resolve, reject) => {
      const cookie = document.cookie;
      const emailArr = cookie.split('=');
      const email = emailArr[emailArr.length - 1];
      return this.httpClient.get('/userPassword', {
        params: {
          user: email
        }
      }).subscribe(user => {
          this.userInfo = user;
          this.email = this.userInfo.user_email;
        },
          error => {
            console.error(error, 'error');
          })
    })
  }

  updatePassword(e) {
    this.password = e.target.value;
  }

  updatePassword2(e) {
    this.password2 = e.target.value;
  }

  ngOnInit() {
    this.getCookieInfo();
  }

}
