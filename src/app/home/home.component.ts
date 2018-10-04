import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodService } from '../food/food.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  meals = [];
  title = 'Earl of Pillsbury';
  constructor(private foodService: FoodService) { }
  // getMeal() {
  //   console.log('Prep says &$*# Jan')
  // }
  getFood() {
    return this.foodService.getFood()
      .subscribe(food => {
        console.log(Array.isArray(food), food);
        
        this.meals.push(food);
        // console.log('we got food', this.meals);
      })
  }
  ngOnInit() {

  }

}
