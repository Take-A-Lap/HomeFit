import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  regimen = [];
  constructor(private httpClient: HttpClient) { }

  getRegimenFromDB(userID) {
    return this.httpClient.get('/recallWOs', {
      params: {
        userId: userID
      }
    }) 
  }

  getCompletedWorkouts(email) {
    return this.httpClient.get('/getUser', {
      params: {
        email: email
      }
    });
  }
}