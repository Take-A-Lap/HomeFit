import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout';
import { WORKOUT, CARDIO } from '../mock-workout';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkoutService } from '../workout.service';
@Component({
  selector: 'app-workout',
  templateUrl: 'workout.component.html',
  styleUrls: ['workout.component.css']
})

// const exercises = [
//   {},
// ];
export class WorkoutComponent implements OnInit {

  
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
          this.masterIndex++;
          //INSERT HTTP REQUEST TO POST THE 
          //WORKOUT THAT WAS JUST COMPLETED
          //AND THE DATE
          if (this.masterIndex > 7){
            this.router.navigate(['/home']);
            // this.exercises = CARDIO;
            // this.index = 0;
            // this.exercise = CARDIO[this.index];
          }
        }
      }, (4500 + 10*this.exercise.rep_time));
    }
    
    getRegimen() {
      return this.workoutService.getRegimenFromDB(this.userID)
      .subscribe(regimen => {
        this.workouts = regimen; 
        console.log(this.workouts);
      })
    }

    workinDatBody(){
      this.plus();
      this.inc();

    }
    
    switchExercise() {
      console.log(WORKOUT.length)
      console.log(this.index);
      this.workout = this.workouts[this.index];
    }
    
    increment() {
      this.index++;
      if (this.index < 8) {
        this.switchExercise();
        this.youtube = this.exercise.youtube_link;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
      } else {
        // this.completed = 'Workout Complete';
      }
    }
    
    testClick(){
      let cookie = document.cookie;
      let emailArr = cookie.split('=')
      let email = emailArr[1]
      console.log(email);
    }

    getWorkoutInfo(){
      let cookie = document.cookie;
      let emailArr = cookie.split('=')
      let email = emailArr[1]
      this.httpClient.get('/getMyWorkOut', {
        params: {email: email}
      }).subscribe((workouts)=>{
        this.workouts = workouts;
        this.workout = workouts[0]
        this.exercise = this.workout[this.index];
        this.youtube = this.exercise.youtube_link;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
        this.name = this.exercise.name;
      });
    }

    home(){
      this.router.navigate(['/home']);
    }
    
    ngOnInit() {
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
      this.getRegimen();  
      this.getWorkoutInfo();    
    }

}
