import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
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
import { WindowRef } from './window-ref';
import { HttpClientModule } from '@angular/common/http';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { FormsModule } from '@angular/forms';
import { MealsComponent } from './meals/meals.component';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SignUpComponent,
    SettingsPersonalInfoComponent,
    DietaryRestrictionsComponent,
    StrengthComponent,
    CardioComponent,
    BreakfastComponent,
    MealsComponent
  ],
  imports: [
    SocialLoginModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'HomeFit' }),
  ],
  providers: [
    FoodService,
    { provide: APP_BASE_HREF, useValue: '/my/app' },
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs},
    WindowRef
  ],
  bootstrap: [AppComponent]
})
//
export class AppModule {
    constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      @Inject(APP_ID) private appId: string) {
      const platform = isPlatformBrowser(platformId) ?
        'in the browser' : 'on the server';
      console.log(`Running ${platform} with appId=${appId}`);
    } 
  }
