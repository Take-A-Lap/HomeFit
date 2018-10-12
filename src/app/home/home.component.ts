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

@Component({
  selector: 'app-home-component',
  templateUrl: 'home2.component.html',
  styleUrls: ['home2.component.css']
})
export class HomeComponent implements OnInit {

  meals = [];
  meals2 = [];
  meals3 = [];
  currentWeather = [];
  time = 0;

  constructor(
    private foodService: FoodService,
    private weatherService: WeatherService,
    private router: Router) { }

  getWeather() {
    return this.weatherService.getWeather()
      .subscribe(currWeather => {
        this.currentWeather.push(currWeather)
      })  
  }
  
  getBreakfast() {
    this.meals = [];
    return this.foodService.getBreakfast()
      .subscribe(breakfastFood => {
        this.meals.push(breakfastFood)
        console.log(this.meals);
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
  }

  displayMeal() {
    this.getTime();
    if (this.time >= 21 || this.time < 11) {
      this.getBreakfast();
    } else if (this.time > 10 && this.time < 14) {
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
