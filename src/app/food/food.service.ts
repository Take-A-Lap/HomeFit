import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) { 
  }

  getBreakfast() {
    return this.httpClient.get('/api/breakfast')
  }

  getLunch() {
    return this.httpClient.get('/api/lunch')
      // .subscribe(data => {
      //   console.log('works', data);
      // })
  }

  getDinner() {
    return this.httpClient.get('/api/dinner');
  }
  
}
