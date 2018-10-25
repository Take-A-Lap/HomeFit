import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-saved-diet',
  templateUrl: './saved-diet.component.html',
  styleUrls: ['./saved-diet.component.css']
})
export class SavedDietComponent implements OnInit {

  user: string;
  diet;
  restrictions = {};

  constructor(private httpClient: HttpClient) { }

  
    
    // if (!this.restrictions[value]) {
    //   (<HTMLInputElement>document.getElementById(value)).style.backgroundColor = "#729085";
    //   this.restrictions[value] = true;
    // } else {
    //   (<HTMLInputElement>document.getElementById(value)).style.backgroundColor = "#B3B3FF";
    //   this.restrictions[value] = false;
    // }
  // }
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
      .then(diet => {
        console.log(diet, 'line 54')
        for (let key in diet[0]) {
          this.restrictions[key] = diet[0][key];
        }
        console.log(this.restrictions)
        this.onLaunch();
      })
  }

  onLaunch() {
  for (let key in this.restrictions) {
      console.log(key, 'key')
      if (this.restrictions[key] !== null) {
        console.log(this.restrictions[key]);
        (<HTMLInputElement>document.getElementById(this.restrictions[key])).style.backgroundColor = "#729085";
      } else {
        (<HTMLInputElement>document.getElementById(this.restrictions[key])).style.backgroundColor = "#B3B3FF";
      }
    }
  }

  onClick(value) {
    if (!this.restrictions[value]) {
      (<HTMLInputElement>document.getElementById(value)).style.backgroundColor = "#729085";
      this.restrictions[value] = true;
    } else {
      (<HTMLInputElement>document.getElementById(value)).style.backgroundColor = "#B3B3FF";
      this.restrictions[value] = false;
    }
  }

  onSubmit() {
    let restArray = [];
    for (var key in this.restrictions) {
      if (this.restrictions[key]) {
        restArray.push(key)
      }
    }
    this.getCookieInfo()
      .then((user: any) => {
      this.httpClient.post('/updateDiet', {
          params: {
            email: user.user,
            restrictions: restArray
          }
        }).subscribe()
      })
  }
  ngOnInit() {
    // this.getCookieInfo();
    this.displaySavedDietInfo();
    // this.onLaunch();
  }

}
