import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsernameService } from '../username.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dietary-restrictions',
  templateUrl: './dietary-restrictions.component.html',
  styleUrls: ['./dietary-restrictions.component.css']
})

export class DietaryRestrictionsComponent implements OnInit {

  username: string;
  user;
  userId: number;
  restrictions = {};
  constructor(private data: UsernameService, private httpClient: HttpClient,
              private router: Router) { }

  onClick(value){
    if(!this.restrictions[value]){
      (<HTMLInputElement>document.getElementById(value)).style.backgroundColor = "#729085";
      this.restrictions[value] = true;
    } else {
      (<HTMLInputElement>document.getElementById(value)).style.backgroundColor = "#B3B3FF";
      this.restrictions[value] = false;
    }
  }

  onSubmit(){
    let restArray = [];
    for(var key in this.restrictions){
      if(this.restrictions[key]){
        restArray.push(key)
      }
    }
    this.getCookieInfo()
    .then(user=>{
      let client = user;
      this.httpClient.post('/diet', {
        params: {
          user: JSON.stringify(user),
          restrictions: restArray
        }
      }).subscribe()
    }) 
  }

  getCookieInfo() {
    //function to get username added to getCookieInfo
    return new Promise((resolve, reject) => {
      let cookie = document.cookie;
      const emailArr = cookie.split('=');
      const email = emailArr[emailArr.length - 1];
      return this.httpClient.get('/username', {
        params: {
          user: email
        }
      })
        .subscribe(user => {
          this.user = user;
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
    this.getCookieInfo().then(user=>{
      this.user = user;
      this.userId = this.user.id;
      this.username = this.user.preferred_username;
    })
  }

}
