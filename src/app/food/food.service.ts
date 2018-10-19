import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) { 
  }

  getBreakfast() {
    return this.httpClient.get('/breakfast')
  }

  getLunch() {
    return this.httpClient.get('/lunch')
    }

  getDinner() {
    return this.httpClient.get('/dinner');
  }
  
}
