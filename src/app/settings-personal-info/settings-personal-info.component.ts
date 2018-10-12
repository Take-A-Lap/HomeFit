import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings-personal-info',
  templateUrl: './settings-personal-info.component.html',
  styleUrls: ['./settings-personal-info.component.css']
})
export class SettingsPersonalInfoComponent implements OnInit {
  
  constructor(private httpClient: HttpClient) { }

  email = '';
  password = '';
  age = '';
  height = '';
  weight = '';
  goals = '';
  push_ups = '';
  squats = '';
  miles = '';
  username = '';
  sex = '';

  updateSex(e) {
    this.sex = e.options[e.selectedIndex].value;
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
  
  updateGoals(e) {
    this.goals = e.target.value;
  }

  updatePushUps(e) {
    this.push_ups = e.target.value;
  }

  updateSquats(e) {
    this.squats = e.target.value;
  }

  updateMiles(e) {
    this.miles = e.target.value;
  }

  updateUsername(e) {
    this.username = e.target.value;
  }

  addUser() {
    let user;
    this.httpClient.post('/signUp', {
      params: {
        weight: this.weight,
        push_ups: this.push_ups,
        miles: this.miles,
        age: this.age,
        sex: this.sex,
        height: this.height,
        squats: this.squats,
        goals: this.goals,
        email: this.email === 'Enter email' ? '' : this.email,
        userName: this.username === 'What name do you go by ?' ? '' : this.username,
        password: this.password,
      }
    
    }).subscribe()
  }
  

  ngOnInit() {
  }

}


