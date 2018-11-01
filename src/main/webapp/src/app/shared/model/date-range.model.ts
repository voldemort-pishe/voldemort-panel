import { Moment } from 'moment';

export class DateRange {
  startDate:Moment;
  endDate:Moment;

  constructor(startDate: Moment, endDate: Moment) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
