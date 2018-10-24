import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
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
              private httpClient: HttpClient,
              private socialAuthService: AuthService) { }

  onSignIn() {
  }

  socialSignIn(/*socialPlatform: string*/) {
    let socialPlatformProvider;
    // if (socialPlatform == "facebook") {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // } else if (socialPlatform == "linkedin") {
    //   socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    // }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // Now sign-in with userData
        // ...

      }
    );
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
