import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatGridListModule, MatInputModule, MatIconModule} from '@angular/material';


import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent, RegisterComponent} from '@app/public';
import {PublicComponent, SecureComponent} from '@app/layouts';
import {DashboardComponent} from '@app/secure';


@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,
    SettingsModule,


    // app
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PublicComponent,
    SecureComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
