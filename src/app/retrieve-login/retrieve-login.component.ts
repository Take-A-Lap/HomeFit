import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retrieve-login',
  templateUrl: './retrieve-login.component.html',
  styleUrls: ['./retrieve-login.component.css']
})
export class RetrieveLoginComponent implements OnInit {

  email: string;
  securityQuestion: any;
  securityQuestionAnswer: string;
  securityInfoFromDatabase: any;
  password: string;
  
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  updateEmail(e) {
    this.email = e.target.value;
    console.log(this.email)
  }

  updateSecurityQuestion() {
    let input = parseInt((<HTMLInputElement>document.getElementById('question')).value);
    this.securityQuestion = input;
  }

  updateSecurityQuestionAnswer(e) {
    this.securityQuestionAnswer = e.target.value;
  }

  getSecurityQuestionAnswer() {
    this.httpClient.post('/reset', {
      params: {
        email: this.email,
        securityQuestion: this.securityQuestion,
        securityQuestionAnswer: this.securityQuestionAnswer
      }
    }).subscribe((answer) => {
      console.log(answer);
      this.securityInfoFromDatabase = answer;
    })
  }

  verifySecurityInfo() {
    if (this.securityQuestion === this.securityInfoFromDatabase.question) {
      if (this.securityQuestionAnswer === this.securityInfoFromDatabase.answer) {
        document.cookie = `emailForPasswordReset=${this.email}`
        this.router.navigate(['/resetPassword']);
      }
    }
  }

  ngOnInit() {
  }

}
