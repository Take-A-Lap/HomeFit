import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { homedir } from 'os';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sign-up',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignUpComponent implements OnInit {

  user;

  constructor(private router: Router, 
              private httpClient: HttpClient) { }

  onSignIn() {
  }
  
  changePage() {
    this.router.navigate(['/home']);
  }
  login(){
    this.router.navigate(['/login']);
  }
  getCookieInfo() {
    return new Promise((resolve, reject) => {
      const cookie = document.cookie;
      const emailArr = cookie.split('=');
      const email = emailArr[emailArr.length - 1];
      return this.httpClient.get('/username', {
        params: {
          user: email
        }
      })
        .subscribe(user => {
          if (user) {
            resolve(user)
          } else {
            reject('user rejection')
          }
        },
          error => {
            console.error(error, 'error');
          })
    })
  }
  home() {
    this.router.navigate(['/home']);
  }
  checkCredentials(){
    if(document.cookie){
      this.getCookieInfo().then(user=>{
        this.user = user
        if(this.user.session){
          this.home();
        }
      })
    }
  }
  ngOnInit() {
    this.checkCredentials()
  }

}
