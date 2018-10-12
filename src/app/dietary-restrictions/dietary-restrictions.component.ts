import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsernameService } from '../username.service';
import { SettingsPersonalInfoComponent } from '../settings-personal-info/settings-personal-info.component';

@Component({
  selector: 'app-dietary-restrictions',
  templateUrl: './dietary-restrictions.component.html',
  styleUrls: ['./dietary-restrictions.component.css']
})

export class DietaryRestrictionsComponent implements OnInit {

  username: string;

  constructor(private data: UsernameService) { }

  printUsername() {
    console.log(this.username);
  }

  ngAfterViewInit() {
    // this.username = this.SettingsPersonalInfoComponent.username;
    // this.printUsername();
  }
  ngOnInit() {
    this.data.currentUsername.subscribe(username => this.username = username)
    this.printUsername();
  }

}
