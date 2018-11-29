import { Component, OnInit } from '@angular/core';
import * as jmoment from 'jalali-moment';
import * as moment from 'moment';
import {PersianNumberHelper} from "@app/core/helper/PersianNumberHelper";
import {Principal} from '@app/core/auth/principal.service';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CandidateScheduleService} from "@app/core";
import {CandidateSchedule, ContentSchedule} from "@app/shared/model/candidate-schedule.model";
import {DateRange} from "@app/shared/model/date-range.model";
import {IEvent} from "@app/shared/model/event.model";
import {EventService} from "@app/core/services/event.service";


@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  greetingText: string;
  todayDateDay: string;
  todayDateMonth: string;
  displayedColumns: string[] = ['action','title', 'description',];
  contentSchedule: ContentSchedule[];
  jCountOfTodaySchedule: string;
  countOfTodaySchedule: number;
  userFirstName: string;
  eventResult: IEvent[];

  constructor(private persianNumberHelper: PersianNumberHelper,
              private principal: Principal,
              private candidateScheduleService: CandidateScheduleService,
              private eventService: EventService) { }

  ngOnInit() {
    this.greetingText = DashboardComponent
      .getGreetingTime(jmoment().locale('en').format('HH'));

    this.todayDateDay = this.persianNumberHelper
      .toPersianNumber(jmoment().locale('fa').format('jD'));

    this.todayDateMonth = jmoment().locale('fa').format('jMMMM');


    this.principal.identity()
      .then(res => {
        this.userFirstName = res.firstName;
      });

    this.candidateScheduleService
      .byOwner()
      .subscribe(
        (res: HttpResponse<CandidateSchedule>) => this.onSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.candidateScheduleService
      .byOwnerAndDate(new DateRange(moment().startOf('day'),moment().endOf('day')))
      .subscribe(
        (res: HttpResponse<CandidateSchedule>) => this.onSuccessCandidateSchedule(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.eventService
      .loadAllByOwner()
      .subscribe(
        (res: HttpResponse<IEvent[]>) => this.onSuccessEvent(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  showDetail(){
    console.log("hello");
  }

  formatDateToTime(date){
    return this.persianNumberHelper.toPersianNumber(date.locale('fa').format('LT'));
  }

  formatDateToHumanReadable(date){
    return this.persianNumberHelper.toPersianNumber(date.locale('fa').format('dddd jD jMMMM'));
  }

  private onSuccess(data: CandidateSchedule){
    console.log(data);
    this.contentSchedule = data.content.slice(0,5);
  }

  private onSuccessCandidateSchedule(data: CandidateSchedule){
    this.countOfTodaySchedule = data.totalElements;
    this.jCountOfTodaySchedule = this.persianNumberHelper.toPersianNumber(data.totalElements);
  }

  private onSuccessEvent(data: IEvent[]){
    this.eventResult = data;
  }



  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

  private static getGreetingTime (currentHour) {
    if(currentHour >= 12 && currentHour <= 17)
      return "ظهر";
    else if(currentHour >= 17)
      return"شب";
    else
      return "صبح";
  }

}
