import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  // selector: 'app-settings-personal-info',
  templateUrl: './login.component.html',
  styleUrls: [/*'./settings-personal-info.component.css'*/]
})
export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router) { }

  email = '';
  password = '';
  
  updateEmail(e) {
    this.email = e.target.value;
  }

  updatePassword(e) {
    this.password = e.target.value;
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  joinUs(){
    this.router.navigate(['/settings-personal-info'])
  }

  authenticate(){
    console.log(this.email)
    const email = this.email;
    const password = this.password;
    this.httpClient.get('/homeFitAuth', {
      params: { email: this.email }
    }).subscribe(password=>{
      const value = Object.values(password)
      // console.log(value[0]);
      if(value[0] === this.password){
        this.goHome();
      } else {
        this.joinUs();
      }
    })
  }
  ngOnInit() {
  }

}