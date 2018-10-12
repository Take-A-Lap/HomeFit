import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dietary-restrictions',
  templateUrl: './dietary-restrictions.component.html',
  styleUrls: ['./dietary-restrictions.component.css']
})
export class DietaryRestrictionsComponent implements OnInit {

  @Input() username: string;
  constructor() { }

  ngOnInit() {
  }

}
