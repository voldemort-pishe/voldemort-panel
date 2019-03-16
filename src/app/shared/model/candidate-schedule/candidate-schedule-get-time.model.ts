import {Moment} from 'moment';

export class CandidateScheduleGetTime{
  endDate: Moment;
  startDate: Moment;

  constructor(startDate: Moment, endDate: Moment) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
