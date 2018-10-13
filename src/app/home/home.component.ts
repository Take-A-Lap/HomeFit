import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { IImage } from 'ng-simple-slideshow';
import { FoodService } from '../food/food.service';
import { WeatherService } from '../weather.service';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  mealImages = [];
  meals = [];
  meals2 = [];
  meals3 = [];
  currentWeather = [];
  workoutDates = [];
  time: number;
  timeStamp: Date;
  email: string;

  constructor(
    private foodService: FoodService,
    private weatherService: WeatherService,
    private router: Router) { }
    private workoutService: WorkoutService
  getWeather() {
    this.timeStamp = new Date();
    return this.weatherService.getWeather()
      .subscribe(currWeather => {
        this.currentWeather.push(currWeather, this.timeStamp.toString())
        console.log(this.currentWeather[1])
      })  
  }
  
  getCookieInfo() {
    let cookie = document.cookie;
    let emailArr = cookie.split('=');
    this.email = emailArr[1];
    console.log(this.email);
  }

  // make a function that takes a user email and sends post request to the backend endpoint that returns an array of information
  // from the completed strength table and cardio table
  getCompletedWorkouts(email) {
    // should return a promise with an array in its callback
    // hardcode the email to be 	reptar@rugrats.com
    this.workoutService.getCompletedWorkouts("reptar@rugrats.com")
      .subscribe(compWorkOuts => {
        // use the array of completed workouts to get dates that should be marked on the calender
        console.log(compWorkOuts);
        // if (compWorkOuts) {
        //   // loop through the completed workouts array
        //   compWorkOuts.forEach(completed => {
        //     // for each completed push into the workout dates array the date property on the completed
        //     this.workoutDates.push(completed.date);
        //   });
        // }
      })
  }

  getBreakfast() {
    this.meals = [];
    return this.foodService.getBreakfast()
      .subscribe(breakfastFood => {
        this.meals.push(breakfastFood)
        // console.log(this.meals);
        this.mealImages = this.meals[0].map(meal => meal.image)
      })
  }

  getLunch() {
    this.meals = [];
    return this.foodService.getLunch()
      .subscribe(lunchFood => {
        // console.log(Array.isArray(lunchFood), lunchFood);
        this.meals.push(lunchFood);
        console.log('we got lunchFood', this.meals);
        this.mealImages = this.meals[0].map(meal => meal.image)
      })
  }
  getDinner() {
    console.log('Getting Dinner');
    this.meals = [];
    return this.foodService.getDinner()
      .subscribe(dinnerFood => {
        this.meals.push(dinnerFood);
        // console.log(this.meals);
        this.mealImages = this.meals[0].map(meal => meal.image)
      });
  }

  getTime() {
    let d = new Date();
    this.time = d.getHours();
  }

  testClick(){
    let cookie = document.cookie;
    let emailArr = cookie.split('=')
    let email = emailArr[1]
    console.log(email);
  }

  displayMeal(){
    this.getTime();
    if (this.time >= 21 || this.time < 10) {
      this.getBreakfast();
    } else if (this.time >= 10 && this.time < 14) {
      this.getLunch();
    } else {
      this.getDinner();
    }
  }

  onSubmit() {
    this.router.navigate(['/personalInfo']);
  }
  ngOnInit() {
    // this.getWeather();
    this.displayMeal();
  }

  
}
