import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodService } from '../food/food.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  meals = [];
  meals2 = [];
  meals3 = [];
  currentWeather = [];
  time: number;
  timeStamp: Date;
  timeStampString: string;
  dates = Array(7);
  latitude: string;
  longitude: string;

  constructor(
    private foodService: FoodService,
    private weatherService: WeatherService,
    private router: Router,
    private httpClient: HttpClient) { }

    
    getWeather2() {
      this.weatherService.getWeather()
    }
    
    getCurrentTime() {
      this.timeStamp = new Date();
      this.timeStampString = this.timeStamp.toString();
    }
    
    // getLocation() {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(position => {
    //         console.log(position);
    //         this.latitude = position.coords.latitude.toString(),
    //         this.longitude = position.coords.longitude.toString()
    //       })
    //     }
    // }
  getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude.toString(),
            this.longitude = position.coords.longitude.toString();
            console.log(this.latitude, this.longitude, 'line 48')
          });
        }
      }
                
    sendWeather() {
      this.httpClient.get('/weather', {
        params: {
          latitude: this.latitude,
          longitude: this.longitude
        }
      })
    }
    
    getWeather() {
      return this.weatherService.getWeather()
        .subscribe(currWeather => {
          console.log(currWeather, 'line 99')
          this.currentWeather.push(currWeather)
          console.log(this.currentWeather)
        })
    }

    // return this.httpClient.post('/weather', {
    //   params: {
    //     info: this.
    //   }
    // }, { responseType: 'text' })
    // .subscribe(data => {
    //   console.log('success', data);
    // },
    //   error => {
    //     console.log('error', error);
    //   });
  // }

  getBreakfast() {
    this.meals = [];
    return this.foodService.getBreakfast()
      .subscribe(breakfastFood => {
        this.meals.push(breakfastFood)
      })
  }

  getLunch() {
    this.meals = [];
    return this.foodService.getLunch()
      .subscribe(lunchFood => {
        // console.log(Array.isArray(lunchFood), lunchFood);
        this.meals.push(lunchFood);
        console.log('we got lunchFood', this.meals);
      })
  }
  getDinner() {
    console.log('Getting Dinner');
    this.meals = [];
    return this.foodService.getDinner()
      .subscribe(dinnerFood => {
        this.meals.push(dinnerFood);
        console.log(this.meals);
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
    setTimeout(() => {
      this.sendWeather();
    }, 2000)
    // setTimeout(() => {
    //   this.getWeather();
    // }, 3500)
    // setTimeout(() => {

    //   this.getWeather();
    // }, 3000)
    // this.getWeather();
    this.getCurrentTime();
    // this.getLocation();
    this.displayMeal();
  }

  
}
