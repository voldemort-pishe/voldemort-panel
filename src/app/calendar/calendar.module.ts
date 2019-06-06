import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule as NgCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalendarRoutingModule,
    NgCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ]
})
export class CalendarModule { }
