import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SettingsPersonalInfoComponent } from './settings-personal-info/settings-personal-info.component';
import { DietaryRestrictionsComponent } from './dietary-restrictions/dietary-restrictions.component';
import { StrengthComponent } from './strength/strength.component';
import { CardioComponent } from './cardio/cardio.component';
import { FoodService } from './food/food.service';
import { HttpClientModule } from '@angular/common/http';
import { BreakfastComponent } from './breakfast/breakfast.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SignUpComponent,
    SettingsPersonalInfoComponent,
    DietaryRestrictionsComponent,
    StrengthComponent,
    CardioComponent,
    BreakfastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [FoodService],
  bootstrap: [AppComponent]
})
//
export class AppModule { }