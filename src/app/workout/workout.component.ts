import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkoutService } from '../workout.service';
@Component({
  selector: 'app-workout',
  templateUrl: 'workout.component.html',
  styleUrls: ['workout.component.css']
})


export class WorkoutComponent implements OnInit {

  id;
  diff;
  clickMessage;
  userID;
  name;
  wo_num;
  wo_index;
  exercise;
  previous;
  ready = true;
  start = true;
  index = 0;
  masterIndex = this.index;
  workout;
  completed;
  rep = 0;
  set = 1;
  email;
  user;
  options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  beep = new Audio('../../assets/sound/beep.wav');
  kudos = new Audio('../../assets/sound/8bit-coin.wav');
  thud = new Audio('../../assets/sound/cuerp-choque-puerta.wav');
  
  youtube = ''
  trustedUrl: SafeUrl;
  
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer, 
    private router: Router,
    private workoutService: WorkoutService,
    ) { }
    
    plus(){
      if(this.set <= 3 && this.ready === true ){
        return new Promise((resolve,reject)=>{
          let repIncrement = setInterval(() => {
            if (this.rep < 10) {
              this.thud.play();
              this.rep++;
            } else {
              clearInterval(repIncrement);
              if (this.rep === 10) {
                resolve('Great set!')
              } else {
                reject('Worse set')
              }
            }
          }, this.exercise.rep_time)
        })
      } else {
        this.set = 1;
        this.increment();
      }
    }
    
    switchRep() {
      this.plus();
    }

    inc(){
      let setIncrement = setInterval(()=>{
        if(this.set <= 3){
          this.switchRep();
        } else {
          clearInterval(setIncrement);
          this.set = 1;
          this.increment();
        }
      }, (12000 + 10*this.exercise.rep_time));
    }

    question(){
      return new Promise((resolve, reject)=>{
        this.ready = false;
        this.clickMessage = 'Continue?'
        this.set++;
      })
    }

    workinDatBody(){
      this.start = false;
      this.plus()
      .then(()=>{
        this.beep.play();
        this.question();
      })
    }


  answer() {
    this.ready = true;
    this.clickMessage = '';
    this.rep = 0;
    if(this.set < 4){
      this.workinDatBody();
    } else {
      this.kudos.play();
      this.workinDatBody();
    }
  }

    switchExercise() {
      this.index++;
      this.exercise = this.workout[this.index];
      this.storeInProgress(this.id, this.exercise.id, this.index);
      this.name = this.exercise.name;
    }
    increment() {
      if (this.index < 7) {
        this.switchExercise();
        this.previous = this.exercise.id;
        this.youtube = this.exercise.youtube_link;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
        this.start = true;
      } else {
        Promise.all([this.storeCompleted(), this.storeInProgress(this.id, this.previous, 0), this.increaseWONum(), this.home()])
          .catch(err => console.error(err))
        ;        
      }
    }
    
    getDate(){
      return new Promise((resolve, reject)=>{
        var d = new Date();
        var mo = d.getMonth() + 1;
        var day = d.getDate();
        var date = `${mo}/${day}`;
        if(date){
          resolve(date);
        } else{
          reject('Date Error');
        }
      })
    }

    storeCompleted(){
      this.getDate().then(date=>{
        this.httpClient.post('/completed', {
          params: { date, id: this.id }
        }).subscribe()
      })
    }

    storeInProgress(id, ex_id, index){
      this.httpClient.post('/inProgress', {
        params: {id, ex_id, index}
      }).subscribe()
    }

    testClick(){
      let cookie = document.cookie;
      let emailArr = cookie.split('=')
      let email = emailArr[2]
    }
    
    generateWO(){
      return new Promise((resolve, reject)=>{
        this.httpClient.get('/generateWO', {
          params: {
            diff: this.diff,
            wo_num: this.wo_num,
            wo_index: this.index.toString(),
            previous: this.previous
          }
        }).subscribe(wo=>{
          this.workout = wo;
          this.exercise = this.workout[this.index];
          this.previous = this.exercise.id;
          this.youtube = this.exercise.youtube_link;
          this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
          this.name = this.exercise.name;
        })
      })
    }

    getCookieInfo(){
      let cookie = document.cookie;
      let emailArr = cookie.split('=');
      this.email = emailArr[emailArr.length -1];
    }

    getUserInfo(){
      let result;
      return new Promise((resolve, reject)=>{
        this.httpClient.get('/getUser', {
          params: { email: this.email }
        }).subscribe(id => {
          result = id;
          this.id = result.id;
          this.wo_num = result.workout_completes;
          this.index = result.current_workout_index || 0;
          this.previous = result.last_exercise_id || 7;
          this.diff = result.squat_comf;
          if (result === id) {
            resolve(id);
          } else {
            reject('Get User Rejection')
          }
        });
      })
    }

    home(){
      this.router.navigate(['/home']);
    }

    increaseWONum(){
      return new Promise((resolve, reject)=>{
        let value = this.wo_num + 1;
        let id = this.id;
        this.httpClient.post('/updateWorkouts', {
          params: {
            value, id
          }
        }).subscribe()
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
    console.log('session')
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
    searchAndGenerate() {
      this.getUserInfo()
      .then(()=>{
        this.generateWO()
      })
    }
    
    ngOnInit() {
      this.getCookieInfo();
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
      // this.generateWO();
      this.searchAndGenerate();
        
    }

}
