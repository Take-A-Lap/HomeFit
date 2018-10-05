import { Component, OnInit } from '@angular/core';
import { Strength } from '../strength';
import { STRENGTH } from '../mock-strength';
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

  
  exercises = STRENGTH;
  index = 0;
  exercise = STRENGTH[this.index];
  completed = '';
  rep = 0;
  set = 1;
  
  youtube = this.exercise.youtube_link
  trustedUrl: SafeUrl;
  
  constructor(private sanitizer: DomSanitizer) {
  }
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
        }
      }, this.exercise.rep_time)
    }
    
    switchRep() {
      this.plus();
    }
    
    workinDatBody(){
      while(this.set < 4){
        
      }
    }
    
    switchExercise() {
      console.log(STRENGTH.length)
      console.log(this.index);
      this.exercise = STRENGTH[this.index];
    }
    
    increment() {
      this.index++;
      if (this.index < 5) {
        this.switchExercise();
      } else {
        this.completed = 'Workout Complete';
      }
    }
    
    ngOnInit() {
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtube);
}

}
