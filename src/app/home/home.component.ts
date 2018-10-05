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
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  meals = [];
  meals2 = [];
  meals3 = [];
  currentWeather = [];

  constructor(
    private foodService: FoodService,
    private weatherService: WeatherService) { }
  // getMeal() {
  //   console.log('Prep says &$*# Jan')
  // }

  getWeather() {
    return this.weatherService.getWeather()
      .subscribe(currWeather => {
        console.log('currWeather', currWeather);
        this.currentWeather.push(currWeather)
        console.log(this.currentWeather);
      })  
  }
  
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
        // console.log('we got lunchFood', this.meals);
      })
  }
  getDinner() {
    this.meals = [];
    return this.foodService.getDinner()
      .subscribe(dinnerFood => {
        this.meals.push(dinnerFood);
      })

  }
  ngOnInit() {
//    this.getWeather();
  }

  
}
