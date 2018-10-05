import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signUp.component.html',
  styles: []
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router) { }

  changePage() {
    this.router.navigate(['/home']);
  }
  ngOnInit() {
  }

}
