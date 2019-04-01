import {Component, OnInit} from '@angular/core';
import * as jmoment from 'jalali-moment';
import * as moment from 'moment';
import {PersianNumberHelper} from "@app/core/helper/PersianNumberHelper";
import {Principal} from '@app/core/auth/principal.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CandidateScheduleService} from "@app/core";
import {DateRange} from "@app/shared/model/date-range.model";
import {EventContentModel} from "@app/shared/model/event.model";
import {EventService} from "@app/core/services/event.service";
import {CandidateSchedulePage} from "@app/shared/model/candidate-schedule/candidate-schedule-page.model";
import {CandidateScheduleContentModel} from "@app/shared/model/candidate-schedule/candidate-schedule-vm.model";


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
  contentSchedule: CandidateScheduleContentModel[];
  jCountOfTodaySchedule: string;
  countOfTodaySchedule: number;
  userFirstName: string;
  eventResult: EventContentModel[];

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
        (res: HttpResponse<CandidateSchedulePage>) => this.onSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.candidateScheduleService
      .byOwnerAndDate(new DateRange(moment().startOf('day'),moment().endOf('day')))
      .subscribe(
        (res: HttpResponse<CandidateSchedulePage>) => this.onSuccessCandidateSchedule(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.eventService
      .getList()
      .subscribe(
        (res) => this.onSuccessEvent(res.data),
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
    return this.persianNumberHelper.toPersianNumber(date.locale('fa').format('YYYY/M/D'));
  }

  private onSuccess(data: CandidateSchedulePage){
    this.contentSchedule = data.content.slice(0,5);
  }

  private onSuccessCandidateSchedule(data: CandidateSchedulePage){
    this.countOfTodaySchedule = data.totalElements;
    this.jCountOfTodaySchedule = this.persianNumberHelper.toPersianNumber(data.totalElements);
  }

  private onSuccessEvent(data: EventContentModel[]){
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
