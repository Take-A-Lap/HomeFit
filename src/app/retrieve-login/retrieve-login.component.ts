import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrieve-login',
  templateUrl: './retrieve-login.component.html',
  styleUrls: ['./retrieve-login.component.css']
})
export class RetrieveLoginComponent implements OnInit {

  email: string;
  
  constructor() { }

  updateEmail(e) {
    this.email = e.target.value;
  }
  
  getSecurityQuestion() {

  }

  ngOnInit() {
  }

}
