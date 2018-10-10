import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Optional } from '@angular/core'
import { Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url
  constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.url = `https://e.homefitdo.com/home`
   }

  getWeather() {
    return this.http.get('/weather');
  }
}
