import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  email: string;

  constructor() { }

  getEmail() {
    let emailArr = document.cookie.split('=');
    this.email = emailArr[emailArr.length -1];
  }

  logoutUser(email) {
    document.cookie = email + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  ngOnInit() {
    this.logoutUser(this.email);
  }

}
