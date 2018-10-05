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

  constructor() { }

  ngOnInit() {
  }

}
