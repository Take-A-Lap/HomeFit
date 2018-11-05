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
    console.log(this.securityQuestion)
  }

  updateSecurityQuestionAnswer(e) {
    this.securityQuestionAnswer = e.target.value;
  }

  getSecurityQuestionAnswer() {
    this.httpClient.post('/security', {
      params: {
        email: this.email,
        securityQuestion: this.securityQuestion,
        securityQuestionAnswer: this.securityQuestionAnswer
      }
    }).subscribe((answer) => {
      this.securityInfoFromDatabase = answer;
      this.verifySecurityInfo();
    })
  }

  verifySecurityInfo() {
    if (this.securityQuestion === Number(this.securityInfoFromDatabase.question)) {
      if (this.securityQuestionAnswer === this.securityInfoFromDatabase.answer) {
        console.log('question and answer match')
        document.cookie = `emailForPasswordReset=${this.email}`
        this.router.navigate(['/resetPassword']);
        
      } else {
        console.log('Security Answer does not match saved information')
      }
    } else {
      console.log('Security Question does not match saved information')
    }
  }

  ngOnInit() {
  }

}
