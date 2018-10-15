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
  userID;
  name;
  wo_num;
  exercise;
  masterIndex = 0;
  index = 0;
  workout;
  completed;
  rep = 0;
  set = 1;
  email;
  options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  
  youtube = ''
  trustedUrl: SafeUrl;
  
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer, 
    private router: Router,
    private workoutService: WorkoutService,
    ) { }
    
    plus(){
      let repIncrement = setInterval(() => {
        if (this.rep < 10) {
          this.rep++;
        } else {
          clearInterval(repIncrement);
          this.rep = 0;
          this.set++;
        }
      }, this.exercise.rep_time)
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

    workinDatBody(){
      this.plus();
      this.inc();

    }

    switchExercise() {
      this.index++;
      this.exercise = this.workout[this.index];
      this.name = this.exercise.name;
    }
    
    increment() {
      if (this.index < 7) {
        this.switchExercise();
        this.youtube = this.exercise.youtube_link;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
      } else {
        this.increaseWONum()
        this.storeCompleted();
        this.home();        
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
    testClick(){
      let cookie = document.cookie;
      let emailArr = cookie.split('=')
      let email = emailArr[2]
      console.log(email);
    }

    getCookieInfo(){
      let cookie = document.cookie;
      let emailArr = cookie.split('=');
      this.email = emailArr[emailArr.length -1];
      console.log(this.email, 'workout.component this.email');
    }

    // getWorkoutInfo(){
    //   this.getUserInfo()
    //   .then((value)=>{
    //     this.id = value;
    //     // console.log(value);
    //     this.httpClient.get('/getMyWorkOut', {
    //       params: { id: this.id }
    //     }).subscribe((workouts) => {
    //       console.log(workouts);
    //       this.workout = workouts[0];
    //       this.exercise = this.workout[this.index];
    //       this.youtube = this.exercise.youtube_link;
    //       this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
    //       this.name = this.exercise.name;
    //     });
    //   })
    //   .catch(err=>console.error(err));  
    // }

    increaseWONum(){
      return new Promise((resolve, reject)=>{
        let value = this.wo_num + 1;
        let id = this.id;
        this.httpClient.post('/updateWorkouts', {
          params: {
            value, id
          }
        }).subscribe(res=>console.log(res))
      })
    }

    printIt(){
      console.log(this.exercise);
      console.log(this.workout[0]);
      console.log(this.workout[1]);
    }

    home(){
      this.router.navigate(['/home']);
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
          this.diff = result.squat_comf;
          if (result === id) {
            resolve(id);
          } else {
            reject('Get User Rejection')
          }
        });
      })
    }

    generateWO(){
      return new Promise((resolve, reject)=>{
        this.httpClient.get('/generateWO', {
          params: {
            diff: this.diff,
            wo_num: this.wo_num
          }
        }).subscribe(wo=>{
          console.log(wo)
          this.workout = wo;
          this.exercise = this.workout[this.index];
          this.youtube = this.exercise.youtube_link;
          this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
          this.name = this.exercise.name;
        })
      })
    }

    searchAndGenerate() {
      this.getUserInfo()
      .then(()=>{
        this.generateWO()
      })
    }

    ngOnInit() {
      this.getCookieInfo();
      // this.getUserInfo();
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
      // this.generateWO();
      this.searchAndGenerate();
        
    }

}
