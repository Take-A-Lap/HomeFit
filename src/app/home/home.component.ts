import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodService } from '../food/food.service';
import { WeatherService } from '../weather.service';
import { WorkoutService } from '../workout.service';
import { IImage } from './iImage';

@Component({
  selector: 'app-home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  imageUrls: (string | IImage)[] = [];
  mealImages = [];
  meals = [];
  meals2 = [];
  meals3 = [];
  currentWeather = [];
  workoutDates = [];
  time: number;
  timeStamp: Date;
  timeStampString: string;
  email: string;
  dates = Array(7);
  latitude: string;
  longitude: string;

  constructor(
    private foodService: FoodService,
    private weatherService: WeatherService,
    private router: Router,
    private httpClient: HttpClient,
    private workoutService: WorkoutService) { }

    getCurrentTime() {
      this.timeStamp = new Date();
      this.timeStampString = this.timeStamp.toString();
    }

    
    
  async getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.latitude = position.coords.latitude.toString(),
        this.longitude = position.coords.longitude.toString();
        this.sendWeather1();
        });
      }
  }

  sendWeather1() {
    return this.httpClient.post('/weather', {
      params: {
        latitude: this.latitude,
        longitude: this.longitude
      }
    }, { responseType: 'text' })
    .subscribe(data => {
      data = JSON.parse(data);
      console.log('success', data);
      console.log(data, 'line 99')
      this.currentWeather.push(data)
      console.log(this.currentWeather)
    },
      error => {
        console.log('error', error);
      });
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
    // this.workoutService.getCompletedWorkouts("reptar@rugrats.com")
    //   .subscribe(compWorkOuts => {
    //     // use the array of completed workouts to get dates that should be marked on the calender
    //     console.log(compWorkOuts);
    //     // if (compWorkOuts) {
    //     //   // loop through the completed workouts array
    //     //   compWorkOuts.forEach(completed => {
    //     //     // for each completed push into the workout dates array the date property on the completed
    //     //     this.workoutDates.push(completed.date);
    //     //   });
    //     // }
    //   })
  }

  getBreakfast() {
    this.meals = [];
    return this.foodService.getBreakfast()
      .subscribe(breakfastFood => {
        this.meals.push(breakfastFood)
        // console.log(this.meals);
        this.mealImages = this.meals[0].map(meal => meal.recipe.image)
      })
  }

  getLunch() {
    this.meals = [];
    return this.foodService.getLunch()
      .subscribe(lunchFood => {
        // console.log(Array.isArray(lunchFood), lunchFood);
        this.meals.push(lunchFood);
        console.log('we got lunchFood', this.meals);
        // this.mealImages = this.meals[0].map(meal => meal.recipe.image)
        this.imageUrls = this.meals[0].map(meal => {
          let proof = () => {
            window.open(meal.recipe.url);
          }
          return {
            url: meal.recipe.image,
            href: meal.recipe.url,
            clickAction: proof
          }
        })
      })
  }


  getDinner() {
    console.log('Getting Dinner');
    this.meals = [];
    return this.foodService.getDinner()
      .subscribe(dinnerFood => {
        this.meals.push(dinnerFood);
        // console.log(this.meals);
        this.mealImages = this.meals[0].map(meal => meal.recipe.image)
      });
  }

  getTime() {
    let d = new Date();
    this.time = d.getHours();
    // the current day of the week is
    let day = d.getDay();
    // the date for the current day of the week is
    let date = d.getDate();
    // Set today's date
    this.dates[day] = date;
    // Fill in other dates based on today's
    for (let i = 0; i < day; i++) {
      this.dates[i] = date - (day - i); 
    }
    for (let i = day + 1; i < this.dates.length; i++) {
      this.dates[i] = date + (this.dates.length - i);
    }
    console.log(this.dates);
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
    this.getLocation();
    // this.getWeather();
    // setTimeout(() => {
    //   this.sendWeather1();
    // }, 4000)
    // setTimeout(() => {
    //   this.getWeather();
    // }, 4500)
    this.getCurrentTime();
    this.displayMeal();
  }

  
}
