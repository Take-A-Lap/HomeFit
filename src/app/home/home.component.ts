import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodService } from '../food/food.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  meals = [];
  meals2 = [];
  meals3 = [];
  title = 'Earl of Pillsbury';
  constructor(private foodService: FoodService) { }
  // getMeal() {
  //   console.log('Prep says &$*# Jan')
  // }

  getBreakfast() {
    return this.foodService.getBreakfast()
      .subscribe(breakfastFood => {
        this.meals2.push(breakfastFood)
      })
  }
  getLunch() {
    return this.foodService.getLunch()
      .subscribe(lunchFood => {
        console.log(Array.isArray(lunchFood), lunchFood);
        
        this.meals.push(lunchFood);
        // console.log('we got lunchFood', this.meals);
      })
  }
  getDinner() {
    return this.foodService.getDinner()
      .subscribe(dinnerFood => {
        this.meals3.push(dinnerFood);
      })

  }
  ngOnInit() {

  }

  
}
