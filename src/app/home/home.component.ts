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
  imageUrls;;
  mealImages = [];
  meals;
  user;
  currentWeather = [];
  recommendation;
  workoutDates = [];
  time: number;
  timeStamp: Date;
  timeStampString: string;
  email: string;
  dates = Array(7);
  latitude: string;
  longitude: string;
  runningRecommendation: string;
  clock: string;
  username: object;

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

    Clock = Date.now();

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude.toString(),
        this.longitude = position.coords.longitude.toString();
        this.sendWeather();
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
    })
    .subscribe(data => {
      this.currentWeather.push(data)
      this.runningRecommendation = this.currentWeather[0].recommendation;
    },
      error => {
        console.error('error', error);
      });
  }
  
  getCookieInfo() {
    //function to get username added to getCookieInfo
    let cookie = document.cookie;
    let emailArr = cookie.split('=');
    this.email = emailArr[emailArr.length - 1];
    return this.httpClient.get('/username', {
      params: {
        user: this.email
      }
    })
    .subscribe(user => {
      this.user = user;
      console.log(this.user)
    }, 
    error => {
      console.error(error, 'error');
    })
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
          console.log(this.workoutDates)
        }
      });
  }

  getBreakfast() {
    return this.httpClient.get('/breakfast')
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
      })
  }

  getLunch() {
    return new Promise((resolve,reject)=>{
      this.foodService.getLunch()
      .subscribe(lunchFood => {
        this.meals = lunchFood;
        let imageUrls = this.meals.map(meal => {
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
    return new Promise((resolve, reject)=>{
      this.foodService.getDinner()
        .subscribe(dinnerFood => {
          this.meals = dinnerFood;
           let imageUrls = this.meals.map(meal => {
            return {
              url: meal.image,
              href: meal.url,
              clickAction: ()=>window.open(meal.url)
            }
          })
          if(imageUrls.length){
            resolve(imageUrls)
          } else {
            reject('Dinner Error')
          }
        });
    })
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
      let count = 1;
      for (let i = day + 1; i < this.dates.length; i++) {
        this.dates[i] = date + count;
        count++;
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
    if (this.time >= 21 || this.time < 10) {
      this.getBreakfast();
    } else if (this.time >= 10 && this.time < 14) {
      this.getLunch()
      .then((result)=>{
        this.imageUrls = result;
      })
    } else {
      this.getDinner()
      .then((result)=>{
        this.imageUrls = result;
      })
    }
  }

  onSubmit() {
    this.router.navigate(['/personalInfo']);
  }

  

  ngOnInit() {
    // this.getCurrentTime();
    this.getTime();  
    this.getLocation();
    this.displayMeal();
    this.getCookieInfo(); 
    this.getCompletedWorkouts();
    setInterval(() => {
      this.Clock = Date.now();
    }, 1000);
  }


}
