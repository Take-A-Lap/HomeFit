import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  age: number;
  weight: number;
  goals: number;
  push_ups: number;
  squats: number;
  miles: number;
  username: string;
  id;
  user;

  updateAge(e) {
    this.age = e.target.value;
  }

  updateWeight(e) {
    this.weight = e.target.value;
  }
  
  updateGoals() {
    var inputValue = parseInt((<HTMLInputElement>document.getElementById('goalId')).value);
    this.goals = inputValue;
  }

  updatePushUps(e) {
    this.push_ups = e.target.value;
  }

  updateSquats(e) {
    var inputValue = parseInt((<HTMLInputElement>document.getElementById('squats')).value);
    this.squats = inputValue;
  }

  updateMiles(e) {
    this.miles = e.target.value;
  }

  updateUsername(e) {
    this.username = e.target.value;
  }

  updateUser() {
    this.httpClient.post('/update', {
      params: {
        id: this.id,
        weight: this.weight,
        push_ups: this.push_ups,
        age: this.age,
        miles: this.miles,
        squats: parseInt((<HTMLInputElement>document.getElementById('squats')).value),
        goals: parseInt((<HTMLInputElement>document.getElementById('goalId')).value),
        userName: this.username === 'What name do you go by ?' ? '' : this.username,
      }
    }).subscribe(()=>this.nutritional())
  }

  getCookieInfo() {
    return new Promise((resolve, reject) => {
      const cookie = document.cookie;
      const emailArr = cookie.split('=');
      const email = emailArr[emailArr.length - 1];
      return this.httpClient.get('/username', {
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

  nutritional() {
    this.router.navigate(['/home']);
  }

  launch(){
    this.getCookieInfo()
    .then(user=>{
      this.user = user
      this.age = this.user.age;
      this.weight = this.user.weight;
      this.goals = this.user.goals;
      this.push_ups = this.user.num_push_ups;
      this.squats = this.user.squat_comf;
      this.miles = this.user.jog_dist;
      this.username = this.user.preferred_username;
      this.id = this.user.id;
    })
  }

  splash() {
    return this.router.navigate(['/logout']);
  }
  deleteCookie(name) {
    return new Promise((resolve, reject) => {
      document.cookie = name +
        '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
      if (document.cookie !== '') {
        reject('Could not delete cookie')
      } else {
        resolve('success')
      }
    })
  }
  removeSession() {
    return new Promise((resolve, reject) => {
      this.httpClient.post('/logout', {
        params: {
          user: JSON.stringify(this.user)
        }
      }).subscribe(message => {
        if (message) {
          resolve(message)
        } else {
          reject('Could not remove Cookies')
        }
      })
    })
  }
  logout() {
    const cookie = document.cookie
    if (cookie) {
      Promise.all([this.deleteCookie(cookie), this.removeSession(), this.splash()])
        .catch(err => console.error(err))
    } else {
      this.splash();
    }
  }

  ngOnInit() {
    this.launch()
  }
}


