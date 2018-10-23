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

  constructor(private data: UsernameService, private httpClient: HttpClient,) { }

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
