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
  userID;
  name;
  exercise;
  masterIndex = 0;
  workouts;
  index = 0;
  workout = '';
  completed = '';
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
          // this.masterIndex++;
          //INSERT HTTP REQUEST TO POST THE 
          //WORKOUT THAT WAS JUST COMPLETED
          //AND THE DATE
          // if (this.masterIndex > 6){
          //   this.router.navigate(['/home']);
          // }
        }
      }, (4500 + 10*this.exercise.rep_time));
    }

    workinDatBody(){
      this.plus();
      this.inc();

    }

    switchExercise() {
      this.index++;
      this.exercise = this.workout[this.index];
    }
    
    increment() {
      if (this.index < 7) {
        this.switchExercise();
        this.youtube = this.exercise.youtube_link;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
      } else {
        // this.completed = 'Workout Complete';
        console.log(this.workouts.length);
        this.workouts.shift();
        console.log(this.workouts.length);
        this.httpClient.post('/updateWorkouts', {
          params: {
            userID: this.id,
            WOs: this.workouts
          }
        }).subscribe()
        this.home();
      }
    }
    
    testClick(){
      let cookie = document.cookie;
      let emailArr = cookie.split('=')
      let email = emailArr[1]
      console.log(email);
    }

    getCookieInfo(){
      let cookie = document.cookie;
      let emailArr = cookie.split('=');
      this.email = emailArr[1];
      console.log(this.email);
    }

    getWorkoutInfo(){
      this.getUserInfo()
      .then((value)=>{
        this.id = value;
        // console.log(value);
        this.httpClient.get('/getMyWorkOut', {
          params: { id: this.id }
        }).subscribe((workouts) => {
          console.log(workouts);
          this.workouts = workouts;
          this.workout = workouts[0];
          this.exercise = this.workout[this.index];
          this.youtube = this.exercise.youtube_link;
          this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
          this.name = this.exercise.name;
        });
      })
      .catch(err=>console.error(err));  
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
          result =id;
          this.id = id;
          result = this.id.id
          if (result === this.id.id) {
            console.log('success');
            resolve(result);
          } else {
            reject('Get User Rejection')
          }
        });
      })
    }

    ngOnInit() {
      this.getCookieInfo();
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
      this.getWorkoutInfo();
        
    }

}
