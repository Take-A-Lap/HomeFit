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
  runningRecommendation: string;

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
        // this.getCurrentTime();
        this.sendWeather1();
        });
      }
  }

  sendWeather1() {
    return this.httpClient.post('/weather', {
      params: {
        latitude: this.latitude,
        longitude: this.longitude,
        timeStamp: this.time
      }
    }, { responseType: 'text' })
    .subscribe(data => {
      data = JSON.parse(data);
      console.log('success', data);
      console.log(data, 'line 99')
      this.currentWeather.push(data)
      this.runningRecommendation = this.currentWeather[0].recommendation;
      console.log(this.runningRecommendation, 'line 75')
    },
      error => {
        console.log('error', error);
      });
  }
  
  getCookieInfo() {
    let cookie = document.cookie;
    let emailArr = cookie.split('=');
    this.email = emailArr[emailArr.length -1];
    console.log(this.email);
  }

  // function that gets completed WO dates for calender
  getCompletedWorkouts() {
    // use the WO service completed WO function with user email stored on the component
    this.workoutService.getCompletedWorkouts(this.email)
      .subscribe(compWorkOuts => {
        // if the func returns dates
        console.log(compWorkOuts);
        if (compWorkOuts) {
          // concat the dates to the workoutDates stored on the component
          this.workoutDates = this.workoutDates.concat(compWorkOuts);
        }
      });
  }

  getBreakfast() {
    this.meals = [];
    return this.foodService.getBreakfast()
      .subscribe(breakfastFood => {
        this.meals.push(breakfastFood)
        console.log(breakfastFood, 'breakfastFood line 114')
        // console.log(this.meals);
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
      this.dates[i] = date + i - 1;
    }
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
    this.getCookieInfo();
    this.getCurrentTime();
    this.displayMeal();
    this.getCompletedWorkouts();
  }

  
}
