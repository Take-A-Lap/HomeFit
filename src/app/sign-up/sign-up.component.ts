import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signUp.component.html',
  styles: [/*'./signin.component.css'*/]
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, private socialAuthService: AuthService) { }

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
        console.log("sign in data : ", userData);
        // Now sign-in with userData
        // ...

      }
    );
  }
  
  changePage() {
    this.router.navigate(['/home']);
  }
  
  ngOnInit() {
  }

}
