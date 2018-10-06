import { Component, OnInit } from '@angular/core';
import { Strength } from '../strength';
import { STRENGTH, CARDIO } from '../mock-strength';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-strength',
  templateUrl: './strength.component.html',
  styles: []
})

// const exercises = [
//   {},
// ];
export class StrengthComponent implements OnInit {

  
  masterIndex = 0;
  exercises = STRENGTH;  
  index = 0;
  exercise = STRENGTH[this.index];
  completed = '';
  rep = 0;
  set = 1;
  
  youtube = this.exercise.youtube_link
  trustedUrl: SafeUrl;
  
  constructor(
    private sanitizer: DomSanitizer, 
    private router: Router
    ) { }
  // sanitizeAndEmbedURL(link){
    //   this.sanitizer.bypassSecurityTrustUrl(link);
    // }
    
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
    
    workinDatBody(){
      this.plus();
      this.inc();

    }
    
    switchExercise() {
      console.log(STRENGTH.length)
      console.log(this.index);
      this.exercise = STRENGTH[this.index];
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
    
    home(){
      this.router.navigate(['/home']);
    }
    
    ngOnInit() {
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtube}?autoplay=1&loop=1`);
}

}
