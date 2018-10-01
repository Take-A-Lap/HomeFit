import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { };

  onSubmit() {
    this.router.navigate(['/home'])
    console.log('clicked')
  }
  title = 'HomeFit';
}
