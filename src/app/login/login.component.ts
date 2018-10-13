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
    console.log('firing');
    this.httpClient.get('/homeFitAuth', {
      params: { email: this.email }
    }).subscribe(password=>{
      console.log(password);
      const value = Object.values(password)
      if(value[0] === this.password){
        document.cookie = `homeFit=${this.email}`;
        this.goHome();
      } else {
        this.joinUs();
      }
    })
  }
  ngOnInit() {
  }

}