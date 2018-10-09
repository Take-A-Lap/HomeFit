import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRef } from './window-ref';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private winRef: WindowRef, private router: Router) {}
  changePage(page) {
    // console.log(this.winRef.nativeWindow.data);
    this.router.navigate([page]);
  }
  ngOnInit() {
    var source = new EventSource('/events');
      // listens for an event from the server (an sseRes.sseSEnd())
      source.onmessage = function(e) {
        console.log('i\'m connecting');
      };
      /** add an event listener for a workoutEvent use event.data or just destructure
       * and then JSON.parse it to get the object sent from the backend
      */ 
      source.addEventListener('workOutEvent', (event) => {
        console.log(event.data);
        this.changePage("/home");
      }, false);
      
      source.addEventListener('newEvent', (event) => {
        console.log(event.data);
      }, false);

  }
  title = 'HomeFit';
}
