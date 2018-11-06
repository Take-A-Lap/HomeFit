import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  AuthServiceConfig
} from "angular-6-social-login";
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SettingsPersonalInfoComponent } from './settings-personal-info/settings-personal-info.component';
import { DietaryRestrictionsComponent } from './dietary-restrictions/dietary-restrictions.component';
import { WorkoutComponent } from './workout/workout.component';
import { FoodService } from './food/food.service';
import { WindowRef } from './window-ref';
import { HttpClientModule } from '@angular/common/http';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { FormsModule } from '@angular/forms';
import { MealsComponent } from './meals/meals.component';
import {SlideshowModule} from 'ng-simple-slideshow';

import { LoginComponent } from './login/login.component'
import { UsernameService } from './username.service';
import { LogoutComponent } from './logout/logout.component';
import { ResetSuccessfulComponent } from './reset-successful/reset-successful.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RetrieveLoginComponent } from './retrieve-login/retrieve-login.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SignUpComponent,
    SettingsPersonalInfoComponent,
    DietaryRestrictionsComponent,
    WorkoutComponent,
    BreakfastComponent,
    MealsComponent,
    LoginComponent,
    LogoutComponent,
    ResetSuccessfulComponent,
    PasswordResetComponent,
    RetrieveLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SlideshowModule
  ],
  providers: [
    FoodService,
    UsernameService,
    {provide: AuthServiceConfig},
    WindowRef
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
