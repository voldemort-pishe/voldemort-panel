import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  LoginComponent,
  RegisterComponent,
  VerificationComponent
} from '@app/public';
import { PublicComponent, SecureComponent } from '@app/layouts';
import {
  InvoicePreviewComponent,
  PlanComponent,
  CalenderComponent
} from '@app/secure';
import { AuthInterceptor } from '@app/blocks/interceptor/auth.interceptor';
import {
  LocalStorageService,
  SessionStorageService,
  NgxWebstorageModule
} from 'ngx-webstorage';
import { AuthExpiredInterceptor } from '@app/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from '@app/blocks/interceptor/errorhandler.interceptor';
import { SubscriptionExpiredInterceptor } from '@app/blocks/interceptor/subscription-expired.interceptor';
import {
  CurrencyPipe,
  CommonModule,
  registerLocaleData
} from '@angular/common';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeFa from '@angular/common/locales/fa';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
registerLocaleData(localeFa);

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,

    NgxWebstorageModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),

    MatProgressButtonsModule,

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
    VerificationComponent,
    PlanComponent,
    InvoicePreviewComponent,
    CalenderComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [LocalStorageService, SessionStorageService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [Injector]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SubscriptionExpiredInterceptor,
      multi: true,
      deps: [Injector]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
