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
  meals;
  meals2 = [];
  meals3 = [];
  currentWeather = [];
  weather;
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
      console.log(this.timeStampString);
    }

    
    
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude.toString(),
        this.longitude = position.coords.longitude.toString();
        this.sendWeather1();
        });
      }
  }

  sendWeather() {
    return this.httpClient.post('/weather', {
      params: {
        latitude: this.latitude,
        longitude: this.longitude,
        timeStamp: this.time
      }
    }, { responseType: 'text' })
    .subscribe(data => {
      data = JSON.parse(data);
      this.currentWeather.push(data)
      this.runningRecommendation = this.currentWeather[0].recommendation;
    },
      error => {
        console.error('error', error);
      });
  }
  
  getCookieInfo() {
    let cookie = document.cookie;
    let emailArr = cookie.split('=');
    this.email = emailArr[1];
  }

  // function that gets completed WO dates for calender
  getCompletedWorkouts() {
    // use the WO service completed WO function with user email stored on the component
    this.workoutService.getCompletedWorkouts(this.email)
      .subscribe(compWorkOuts => {
        // if the func returns dates
        if (compWorkOuts) {
          // concat the dates to the workoutDates stored on the component
          this.workoutDates = this.workoutDates.concat(compWorkOuts);
        }
      });
  }

  getBreakfast() {
    return this.foodService.getBreakfast()
      .subscribe(breakfastFood => {
        this.meals = breakfastFood
        this.imageUrls = this.meals.map(meal => {
          let proof = () => {
            window.open(meal.url);
          }
          
          return {
            url: meal.image,
            href: meal.url,
            clickAction: proof
          }
        })
        console.log(this.imageUrls)
      })
  }

  getLunch() {
    return new Promise((resolve,reject)=>{
      this.foodService.getLunch()
      .subscribe(lunchFood => {
        this.meals = lunchFood;
        this.imageUrls = this.meals.map(meal => {
          return {
            url: meal.image,
            href: meal.url,
            clickAction: ()=>window.open(meal.url)
          }
        })
        if(imageUrls.length){
          resolve(imageUrls)
        } else {
          reject('Lunch Error')
        }
      })
    })
  }


  getDinner() {
    return this.foodService.getDinner()
      .subscribe(dinnerFood => {
        this.meals = dinnerFood;
        this.imageUrls = this.meals.map(meal => {
          let proof = () => {
            window.open(meal.url);
          }
          return {
            url: meal.image,
            href: meal.url,
            clickAction: proof
          }
        })
      });
  }

  getTime() {
    return new Promise((resolve, reject)=>{
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
      if (d){
        resolve(d)
      } else {
        reject('error getting time')
      }
    })
  }

  testClick(){
    let cookie = document.cookie;
    let emailArr = cookie.split('=')
    let email = emailArr[1]
  }

  displayMeal(){
    this.getTime();
    if (this.time >= 21 || this.time < 10) {
      this.getBreakfast();
    } else if (this.time >= 10 && this.time < 14) {
      this.getLunch()
      .then((result)=>{
        console.log(Array.isArray(result))
        result.forEach((item)=>{
          console.log(item)
        })
        this.imageUrls = result;
      })
    } else {
      this.getDinner();
    }
  }

  onSubmit() {
    this.router.navigate(['/personalInfo']);
  }

  ngOnInit() {
    this.getCurrentTime();  
    this.getLocation();
    this.displayMeal();
    this.getCookieInfo();
    this.getCompletedWorkouts();
  } 
}
