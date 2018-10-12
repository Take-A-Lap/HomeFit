import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  // selector: 'app-settings-personal-info',
  templateUrl: './login.component.html',
  styleUrls: [/*'./settings-personal-info.component.css'*/]
})
export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  email = '';
  password = '';
  
  updateEmail(e) {
    this.email = e.target.value;
  }

  updatePassword(e) {
    this.password = e.target.value;
  }

  authenticate(){
    console.log(this.email)
    const email = this.email;
    const password = this.password;
    this.httpClient.post('/homeFitAuth', {
      params: { email: this.email }
    }).subscribe(password=>{
      
    })
  }
  ngOnInit() {
  }

}