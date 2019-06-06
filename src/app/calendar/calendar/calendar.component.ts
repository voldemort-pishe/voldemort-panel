import { Component, ViewChild, OnInit } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { JalaliPipe } from '@app/shared/pipe/jalali.pipe';
import { PersianNumberPipePipe } from '@app/shared/pipe/persian-number.pipe';
import { CalendarService } from '@app/shared/services/data/calendar.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { CandidateScheduleGetTime } from '@app/shared/model/candidate-schedule-get-time.model';

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
  selector: 'anms-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [JalaliPipe, PersianNumberPipePipe]
})

export class CalendarComponent implements OnInit {
  constructor(private jalaliPipe: JalaliPipe,
    private persianNumber: PersianNumberPipePipe,
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
  refresh: Subject<any> = new Subject();

  ngOnInit() {
    this.GetTimes();
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
  GetTimes() {
    let date = new CandidateScheduleGetTime(moment().startOf('month'), moment().endOf('month'));
    return this.calendarService.getByTime(date).subscribe(r => {
      if (r.success)
        this.InitCalendarView(r.data.content);
    },
    );
  }
  InitCalendarView(data) {
    let list: Array<any> = [];

    data.forEach(function (item) {
      list.push(
        {
          start: new Date(item.data.startDate),
          title: ` ${item.data.description} با  ${item.include.candidate.firstName} ${item.include.candidate.lastName}
          -`,
          color: colors.red
        }
      );
    });

    this.events = list;
    this.refresh.next();
  }

}
