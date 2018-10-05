import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-personal-info',
  templateUrl: './settings-personal-info.component.html',
  styleUrls: ['./settings-personal-info.component.css']
})
export class SettingsPersonalInfoComponent implements OnInit {

  age = '';
  height = '';
  weight = '';
  goals = '';
  push_ups = '';
  squats = '';
  miles = '';

  updateAge(e) {
    this.age = e.target.value;
    console.log(this.age)
  }

  updateHeight(e) {
    this.height = e.target.value;
    console.log(this.height)
  }

  updateWeight(e) {
    this.weight = e.target.value;
    console.log(this.weight)
  }
  
  updateGoals(e) {
    this.updateGoals = e.target.value;
    console.log(e.target.value);
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

  params = {
    age: this.age,
    height: this.height,
    weight: this.weight,
    goals: this.goals,
    push_ups: this.push_ups,
    squats: this.squats,
    miles: this.miles
  }

  
  constructor() { }

  ngOnInit() {
  }

}
