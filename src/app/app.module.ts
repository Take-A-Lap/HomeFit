import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SettingsPersonalInfoComponent } from './settings-personal-info/settings-personal-info.component';
import { SettingsDietaryRestrictionsComponent } from './settings-dietary-restrictions/settings-dietary-restrictions.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SignUpComponent,
    SettingsPersonalInfoComponent,
    SettingsDietaryRestrictionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
