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

  // params = {
  //   age: this.age,
  //   height: this.height,
  //   weight: this.weight,
  //   goals: this.goals,
  //   push_ups: this.push_ups,
  //   squats: this.squats,
  //   miles: this.miles
  // }

  addUser() {
    this.httpClient.post('/personalInfo', {
      params: {
        email: this.email,
        password: this.password,
        age: this.age,
        height: this.height,
        weight: this.weight,
        goals: this.goals,
        push_ups: this.push_ups,
        squats: this.squats,
        miles: this.miles
      }
    })
      .subscribe(
        (data:any) => {
          console.log(data);
        }
      )
  }
  

  ngOnInit() {
  }

}


