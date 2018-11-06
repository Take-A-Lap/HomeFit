import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getCookieInfo() {
    // return new Promise((resolve, reject) => {
      const cookie = document.cookie;
      const emailArr = cookie.split(';');
      // console.log(emailArr)
      const newArr = emailArr[0];
      const emailArr2 = newArr.split('=');
      const email = emailArr2[emailArr2.length -1];
      // console.log(email);
      return this.httpClient.get('/userPassword', {
        params: {
          user: email
        }
      }).subscribe(user => {
        // console.log(user)
          this.userInfo = user;
          this.email = this.userInfo.user_email;
        },
          error => {
            console.error(error, 'error');
          })
    // })
  }

  updatePassword(e) {
    this.password = e.target.value;
  }

  updatePassword2(e) {
    this.password2 = e.target.value;
  }
  
  verifyPasswords() {
    if (this.password === this.password2) {
      console.log(this.email);
      this.updatePasswordInDatabase();
      this.destroyCookie(this.email);
      this.router.navigate(['/resetSuccessful']);
    } else {
      console.log('Passwords don\'t match');
    }
  }
  
  destroyCookie(email) {
    // const cookie = document.cookie;
    // const cookieArr = cookie.split(';');
    // const cookieForDestruction = cookieArr[cookieArr.length - 1];
    // console.log(cookieForDestruction);
    // console.log(cookie);
    document.cookie = email + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log(document.cookie);
  }

  updatePasswordInDatabase() {
    this.httpClient.post('/newPassword', {
      params: {
        email: this.email,
        newPassword: this.password
      }
    }).subscribe(() => {})
  }

  ngOnInit() {
    this.getCookieInfo();
  }

}
