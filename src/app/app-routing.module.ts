import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  // { path: '', component: AppComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'settings', component: SettingsComponent},
  { path: "**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { } 
export const routingComponents = [HomeComponent, SettingsComponent, ErrorComponent]