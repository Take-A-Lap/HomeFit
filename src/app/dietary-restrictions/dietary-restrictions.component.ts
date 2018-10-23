import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsernameService } from '../username.service';
import { HttpClient } from '@angular/common/http'

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
  constructor(private data: UsernameService, private httpClient: HttpClient,) { }

  onClick(value){
    console.log(value);
    if(!this.restrictions[value]){
      (<HTMLInputElement>document.getElementById(value)).style.backgroundColor = "#B73A58";
      this.restrictions[value] = true;
    } else {
      (<HTMLInputElement>document.getElementById(value)).style.backgroundColor = "#B3B3FF";
      this.restrictions[value] = false;
    }
  }

  onSubmit(){
    console.log('in function')
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
  ngOnInit() {
    this.getCookieInfo().then(user=>{
      this.user = user;
      this.userId = this.user.id;
      this.username = this.user.preferred_username;
    })
  }

}
