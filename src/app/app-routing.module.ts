import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SettingsPersonalInfoComponent } from './settings-personal-info/settings-personal-info.component';
import { DietaryRestrictionsComponent } from './dietary-restrictions/dietary-restrictions.component';
import { StrengthComponent } from './strength/strength.component';
import { CardioComponent } from './cardio/cardio.component';
import { MealsComponent } from './meals/meals.component';

const routes: Routes = [
  // { path: '', component: AppComponent},
  { path: '', redirectTo: '/signup', pathMatch: 'full'},
  { path: 'signup', component: SignUpComponent},
  { path: 'home', component: HomeComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'personalInfo', component: SettingsPersonalInfoComponent},
  { path: 'dietaryRestrictions', component: DietaryRestrictionsComponent},
  { path: 'strengthWorkout', component: StrengthComponent},
  { path: 'cardioWorkout', component: CardioComponent},
  { path: 'meals', component: MealsComponent},
  { path: "**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { } 
export const routingComponents = [
  HomeComponent, 
  SignUpComponent, 
  SettingsComponent,
  SettingsPersonalInfoComponent, 
  DietaryRestrictionsComponent,
  StrengthComponent,
  CardioComponent,
  MealsComponent,
  ErrorComponent
]