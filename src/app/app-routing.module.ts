import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SettingsPersonalInfoComponent } from './settings-personal-info/settings-personal-info.component';
import { DietaryRestrictionsComponent } from './dietary-restrictions/dietary-restrictions.component';
import { WorkoutComponent } from './workout/workout.component';
import { MealsComponent } from './meals/meals.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UpdateComponent } from './update/update.component';
import { SavedDietComponent } from './saved-diet/saved-diet.component';
import { RetrieveLoginComponent } from './retrieve-login/retrieve-login.component';

const routes: Routes = [
  // { path: '', component: AppComponent},
  // { path: '', redirectTo: '/signup', pathMatch: 'full'},
  { path: '', /*redirectTo: '/signup', pathMatch: 'full'*/ component: SignUpComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'home', component: HomeComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'personalInfo', component: SettingsPersonalInfoComponent},
  { path: 'diet', component: DietaryRestrictionsComponent},
  { path: 'workout', component: WorkoutComponent},
  { path: 'meals', component: MealsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'update', component: UpdateComponent},
  { path: 'savedDiet', component: SavedDietComponent},
  { path: 'usernameRetrieval', component: RetrieveLoginComponent},
  { path: "**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})


export class AppRoutingModule { } 
export const routingComponents = [
  HomeComponent, 
  SignUpComponent, 
  SettingsComponent,
  SettingsPersonalInfoComponent, 
  DietaryRestrictionsComponent,
  WorkoutComponent,
  MealsComponent,
  ErrorComponent,
  LoginComponent,
  LogoutComponent,
  UpdateComponent,
  SavedDietComponent,
  RetrieveLoginComponent
]
