import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

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
  CandidateComponent,
  CandidatePageComponent,
  CandidateCreateDialog,
  DashboardComponent,
  InvoicePreviewComponent,
  PlanComponent,
  JobComponent,
  JobCreateDialog,
  JobPageComponent,
  CalenderComponent
} from '@app/secure';
import { AuthInterceptor } from '@app/blocks/interceptor/auth.interceptor';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AuthExpiredInterceptor } from '@app/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from '@app/blocks/interceptor/errorhandler.interceptor';
import { SubscriptionExpiredInterceptor } from '@app/blocks/interceptor/subscription-expired.interceptor';
import { CurrencyPipe, CommonModule, registerLocaleData } from '@angular/common';
import { RiyalCurrencyPipe } from '@app/shared/pipe/riyal-currency.pipe';
import { PersianNumberPipePipe } from '@app/shared/pipe/persian-number.pipe';
import { JalaliPipe } from '@app/shared/pipe/jalali.pipe';
import { CandidatePageEmailDialog } from '@app/secure/candidate-page/candidate-page.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AvatarModule } from 'ngx-avatar';
import localeFa from '@angular/common/locales/fa';
import {MatProgressButtonsModule} from "mat-progress-buttons";
registerLocaleData(localeFa);


@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,


    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    AvatarModule,
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
  entryComponents: [
    CandidatePageComponent,
    CandidateCreateDialog,
    JobCreateDialog,
    CandidatePageComponent,
    CandidatePageEmailDialog,
    JobPageComponent
  ],
  declarations: [
    AppComponent,
    RiyalCurrencyPipe,
    PersianNumberPipePipe,
    JalaliPipe,
    PublicComponent,
    SecureComponent,
    LoginComponent,
    RegisterComponent,
    VerificationComponent,
    DashboardComponent,
    PlanComponent,
    InvoicePreviewComponent,
    CandidateComponent,
    CandidateCreateDialog,
    CandidatePageComponent,
    CandidatePageEmailDialog,
    JobComponent,
    JobCreateDialog,
    JobPageComponent,
    CalenderComponent
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
