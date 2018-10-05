import { Component, OnInit } from '@angular/core';
import { Strength } from '../strength';
import { STRENGTH } from '../mock-strength';

@Component({
  selector: 'app-strength',
  templateUrl: './strength.component.html',
  styles: []
})

// const exercises = [
//   {},
// ];
export class StrengthComponent implements OnInit {

  exercises = STRENGTH;

  switchExercise() {

  }
  constructor() { }

  ngOnInit() {
  }

}
