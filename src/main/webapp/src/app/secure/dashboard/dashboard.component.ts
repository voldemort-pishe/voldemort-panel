import { Component, OnInit } from '@angular/core';
import * as moment from 'jalali-moment';
import {PersianNumberHelper} from "@app/core/helper/PersianNumberHelper";


export interface PeriodicElement {
  name: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'حامد محمودی', description: 'ایمیل از حامد محمودی'},
  {name: 'امیر عزیمی', description: 'یک رویداد زمانبندی شده'},
  {name: 'امیر عزیمی', description: 'یادآوری'},
  {name: 'امیر عزیمی', description: 'یادآوری'}
];


@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  greetingText;
  todayDateDay;
  todayDateMonth;
  displayedColumns: string[] = ['action','name', 'description',];
  dataSource = ELEMENT_DATA;

  constructor(private persianNumberHelper: PersianNumberHelper) { }

  ngOnInit() {
    this.greetingText = DashboardComponent.getGreetingTime(moment().locale('en').format('HH'));
    this.todayDateDay = this.persianNumberHelper.toPersianNumber(moment().locale('fa').format('jD'));
    this.todayDateMonth = moment().locale('fa').format('jMMMM');
  }

  showDetail(){
    console.log("hello");
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
