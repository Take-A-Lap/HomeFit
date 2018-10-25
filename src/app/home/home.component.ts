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
  imageUrls;
  d;
  mealImages = [];
  meals;
  calorieProfile;
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
    return new Promise((resolve,reject)=>{
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
          if(user){
            resolve(user)
          } else {
            reject('user rejection')
          }
        },
          error => {
            console.error(error, 'error');
          })
    })  
  }
  getCompletedWorkouts(email) {
    return new Promise((resolve, reject)=>{
      this.workoutService.getCompletedWorkouts(email)
        .subscribe(compWorkOuts => {
          if (compWorkOuts) {
            this.workoutDates = this.workoutDates.concat(compWorkOuts);
            resolve(this.workoutDates);
          } else {
            reject('Completed Rejection')
          }
        });
    })
  }

  getBreakfast(calorieProfile, dietaryRestrictions) {
    let cal = JSON.stringify(calorieProfile)
    return this.httpClient.get('/breakfast', {
      params: {
        calorieProfile: cal, dietaryRestrictions
      }
    })
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

  getLunch(calorieProfile, dietaryRestrictions) {
    let cal = JSON.stringify(calorieProfile)
    return new Promise((resolve,reject)=>{
      this.httpClient.get('/lunch', {
        params: {
          calorieProfile: cal, dietaryRestrictions
        }
      })
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

  getDinner(calorieProfile, dietaryRestrictions) {
    let cal = JSON.stringify(calorieProfile)
    return new Promise((resolve, reject)=>{
      this.httpClient.get('/dinner', {
        params: {
          calorieProfile: cal, dietaryRestrictions, user: JSON.stringify(this.user)
        }
      })
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
      this.d = d;
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
  splash() {
    return this.router.navigate(['/signup']);
  }
  deleteCookie(name){
    return new Promise((resolve,reject)=>{
        document.cookie = name +
          '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
      if (document.cookie !== ''){
        reject('Could not delete cookie')
      } else {
        resolve('success')
      }
    })
  }
  removeSession(){
    return new Promise((resolve, reject)=>{
      this.httpClient.post('/logout', {
        params: {
          user: JSON.stringify(this.user)
        }
      }).subscribe(message=>{
        if(message){
          resolve(message)
        } else {
          reject('Could not remove Cookies')
        }
      })
    })
  }
  logout(){
    const cookie = document.cookie
    if(cookie){
      Promise.all([this.deleteCookie(cookie), this.removeSession(), this.splash()])
      .catch(err=>console.error(err))
    } else {
      this.splash();
    }
  }
  
  testClick(){
    let cookie = document.cookie;
    let emailArr = cookie.split('=')
    let email = emailArr[1]
  }

  displayMeal(calorieProfile, dietaryRestrictions){
    if (this.time >= 21 || this.time < 10) {
      this.getBreakfast(calorieProfile, dietaryRestrictions)
    } else if (this.time >= 10 && this.time < 14) {
      this.getLunch(calorieProfile, dietaryRestrictions)
      .then((result)=>{
        this.imageUrls = result;
      })
    } else {
      this.getDinner(calorieProfile, dietaryRestrictions)
      .then((result)=>{
        this.imageUrls = result;
      })
    }
  }

  onSubmit() {
    this.router.navigate(['/update']);
  }

  setCalories(user, completes, today){
    return new Promise((resolve, reject)=>{
      this.httpClient.get('/calories', {
        params: {
          user: JSON.stringify(user), completes, today
        }
      }).subscribe(result=>{
        this.calorieProfile = result
        if(result){
          resolve(result)
        } else {
          reject('Calorie Front Rejection')
        }
      })
    })
  }

  launch(){
  let user;
    this.getCookieInfo()
    .then(userResult=>{
      user = userResult
      return Promise.all([this.getTime(), this.getCompletedWorkouts(user.user_email)])
    })
    .then(results => results.concat(user))
    .then(results=>{
      return this.setCalories(results[2], results[1], this.d.getDate())
    })
    .then(result=>{
      return this.displayMeal(result, '')
    })
    }
  

  ngOnInit() {
    // this.getCurrentTime();
    this.getTime();
    this.getLocation();
    this.launch()
    // .then
    // this.displayMeal();
  }

  
}
