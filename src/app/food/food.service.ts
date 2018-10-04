import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) { 
  }
    getFood() {
      return this.httpClient.get('/lunch')
        // .subscribe(data => {
        //   console.log('works', data);
        // })
    }
  
}
