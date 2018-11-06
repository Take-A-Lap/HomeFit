import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsernameService } from '../username.service';
import { Router } from '@angular/router';
// import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings-personal-info',
  templateUrl: './settings-personal-info.component.html',
  styleUrls: ['./settings-personal-info.component.css']
})
export class SettingsPersonalInfoComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private data: UsernameService) { }

  email: string;
  password: string;
  age: number;
  height: number;
  weight: number;
  goals: number;
  push_ups: number;
  squats: number;
  miles: number;
  username: string;
  sex: string;
  securityQuestion: any;
  securityQuestionAnswer: string;

  updateSex() {
    var inputValue = (<HTMLInputElement>document.getElementById('sex')).value;
    this.sex = inputValue;
    console.log(this.sex);
  }

  updateEmail(e) {
    this.email = e.target.value;
  }

  updatePassword(e) {
    this.password = e.target.value;
  }

  updateAge(e) {
    this.age = e.target.value;
  }

  updateHeight(e) {
    this.height = e.target.value;
  }

  updateWeight(e) {
    this.weight = e.target.value;
  }
  
  updateGoals() {
    var inputValue = parseInt((<HTMLInputElement>document.getElementById('goalId')).value);
    this.goals = inputValue;
  }

  updatePushUps(e) {
    this.push_ups = e.target.value;
  }

  updateSquats(e) {
    var inputValue = parseInt((<HTMLInputElement>document.getElementById('squats')).value);
    this.squats = inputValue;
  }

  updateMiles(e) {
    this.miles = e.target.value;
  }

  updateUsername(e) {
    this.username = e.target.value;
  }

  updateSecurityQuestion(e) {
    let input = parseInt((<HTMLInputElement>document.getElementById('question')).value);
    this.securityQuestion = input;
    console.log(this.securityQuestion)
  }

  updateSecurityQuestionAnswer(e) {
    this.securityQuestionAnswer = e.target.value;
  }
  addUser() {
    document.cookie = `homeFit=${this.email}`
    if(this.email === '???'){
      window.alert('Invalid Email Address')
    } else {
    this.httpClient.post('/signUp', {
      params: {
        weight: this.weight,
        push_ups: this.push_ups,
        miles: this.miles,
        age: this.age,
        sex: (<HTMLInputElement>document.getElementById('sex')).value,
        height: this.height,
        squats: parseInt((<HTMLInputElement>document.getElementById('squats')).value),
        goals: parseInt((<HTMLInputElement>document.getElementById('goalId')).value),
        email: this.email === 'Enter email' ? '' : this.email,
        userName: this.username === 'What name do you go by ?' ? '' : this.username,
        password: this.password,
        securityQuestion: this.securityQuestion,
        securityQuestionAnswer: this.securityQuestionAnswer
      }
    
    }).subscribe(()=>this.nutritional())
  }
  }

  nutritional() {
    this.router.navigate(['/diet']);
  }

  ngOnInit() {
    this.data.currentUsername.subscribe(username => this.username = username);
  }

  newUsername() {
    this.data.changeUsername(this.username);
  }
}


