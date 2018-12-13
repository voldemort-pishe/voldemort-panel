import {ChangeDetectionStrategy, Component, AfterViewInit, ViewChild} from '@angular/core';
import {addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
import {CalendarEvent, CalendarView, DAYS_OF_WEEK} from 'angular-calendar';
import {JalaliPipe} from '@app/shared/pipe/jalali.pipe';
import {PersianNumberPipePipe} from '@app/shared/pipe/persian-number.pipe';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

import {CandidateSchedulePage} from "@app/shared/model/candidate-schedule/candidate-schedule-page.model";
import {CalendarService} from '@app/core/services/calendar.service';
import * as moment from 'moment';
import {CandidateScheduleGetTime} from "@app/shared/model/candidate-schedule/candidate-schedule-get-time.model";


const colors: any = {
  red: {
    primary: '#EC407A',
    secondary: 'rgb(232, 215, 217)'
  },
  blue: {
    primary: '#29B6F6',
    secondary: '#D1E8FF'
  },
  indigo: {
    primary: '#AB47BC ',
    secondary: 'rgb(230, 222, 243)'
  }
};

@Component({
  selector: 'anms-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [ JalaliPipe, PersianNumberPipePipe ]
})
export class CalenderComponent  implements AfterViewInit{
  constructor(private jalaliPipe: JalaliPipe,
              private persianNumber : PersianNumberPipePipe,
              private calendarService: CalendarService) {
  }
  @ViewChild('modalContent')
  Today = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = this.Today;
  locale: string = 'fa';
  weekStartsOn: number = DAYS_OF_WEEK.SATURDAY;
  activeDayIsOpen: boolean = false;
  events: CalendarEvent[];


  ngAfterViewInit () {
    let date = new CandidateScheduleGetTime(moment().startOf('month'), moment().endOf('month'));
    this.calendarService.getByTime(date).subscribe(
      (res: HttpResponse<CandidateSchedulePage>) => {
        this.InitCalendarView (res.body.content);
      },
      (res: HttpErrorResponse) => console.log(res)
    );
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
  InitCalendarView (data) {
    let list = [];

    data.forEach(function(item){
      list.push(
        {
          start: new Date(item.data.startDate),
          title: ` ${item.data.description} با  ${item.include.candidate.firstName} ${item.include.candidate.lastName}
          -`,
          color: colors.red,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: false
        }
      );
    });

    this.events = list;
  }
  }
