import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-saved-diet',
  templateUrl: './saved-diet.component.html',
  styleUrls: ['./saved-diet.component.css']
})
export class SavedDietComponent implements OnInit {

  user: string;
  constructor(private httpClient: HttpClient) { }

  getCookieInfo() {
    return new Promise((resolve, reject) => {
      const cookie = document.cookie;
      const emailArr = cookie.split('=');
      const email = emailArr[emailArr.length - 1];
      return this.httpClient.get('/userDiet', {
        params: {
          user: email
        }
      })
        .subscribe(user => {
          if (user) {
            resolve(user)
          } else {
            reject('user rejection')
          }
        },
          error => {
            console.error(error, 'error');
          })
    })
  }

  displaySavedDietInfo() {
    this.getCookieInfo()
      .then(user => {
        
      })
  }
  ngOnInit() {
  }

}
