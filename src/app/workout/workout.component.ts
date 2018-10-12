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
  user;
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
        this.updateWorkout();
        this.home()

      }
    }

    updateWorkout(){
      console.log(this.workout.length);
      this.workouts.shift();
      this.workout = this.workout;
      console.log(this.workout.length);
      this.httpClient.post('/updateWorkouts', {
        params: {
          userId: this.id,
          WOs: this.workouts
        }
      }).subscribe();
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
      this.getCookieInfo();
      this.httpClient.get('/getMyWorkOut', {
        params: {email: this.email}
      }).subscribe((workouts)=>{
        this.workouts = workouts;
        this.workout = workouts[0];
        this.exercise = this.workout[this.index];
        this.youtube = this.exercise.youtube_link;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
        this.name = this.exercise.name;
      });
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
      this.getCookieInfo();
      this.httpClient.get('/getUser', { 
        params: { email: this.email }
      }).subscribe(profile=>{
        // console.log(profile.id);
        this.user = profile
        this.id = this.user.id;
        // console.log(this.userID);
      });
    }

    ngOnInit() {        
      this.getWorkoutInfo();
      this.getUserInfo();  
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
        
    }

}
