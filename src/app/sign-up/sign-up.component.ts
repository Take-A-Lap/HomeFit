import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRef } from '../window-ref';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signUp.component.html',
  styles: []
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, private winRef: WindowRef) { }

  changePage() {
    console.log(this.winRef.nativeWindow.data);
    this.router.navigate(['/home']);
  }
  ngOnInit() {
  }

}
