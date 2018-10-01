import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home-component/home-component.component';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: '', component: AppComponent},
  { path: 'home', component: HomeComponent},
  // { path: "**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { } 
export const routingComponents = [HomeComponent]