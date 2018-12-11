import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,
   DAYS_OF_WEEK} from 'angular-calendar';
import {JalaliPipe} from '@app/shared/pipe/jalali.pipe';
import {PersianNumberPipePipe} from '@app/shared/pipe/persian-number.pipe';

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
export class CalenderComponent {
  constructor(public jalaliPipe: JalaliPipe,
              public persianNumber : PersianNumberPipePipe) {
  }
  @ViewChild('modalContent')
  Today = new Date();
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = this.Today;

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  locale: string = 'fa';
  weekStartsOn: number = DAYS_OF_WEEK.SATURDAY;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(this.Today), 1),
      end: addDays(this.Today, 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(this.Today),
      title: 'An event with no end date',
      color: colors.blue,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(this.Today), 3),
      end: addDays(endOfMonth(this.Today), 3),
      title: 'A long event that spans 2 months',
      color: colors.indigo,
      allDay: true
    },
    {
      start: addHours(startOfDay(this.Today), 2),
      end: this.Today,
      title: 'A draggable and resizable event',
      color: colors.blue,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];


  activeDayIsOpen: boolean = true;

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

  eventTimesChanged({
    event,
    newStart,
    newEnd
    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(this.Today),
      end: endOfDay(this.Today),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
}
