import { Component, OnInit } from '@angular/core';
import { CandidateScheduleService } from '@app/core';
import * as moment from 'jalali-moment';
import { Principal } from '@app/core/auth/principal.service';
import { CandidateScheduleContentModel } from '@app/shared/model/candidate-schedule.model';

@Component({
  selector: 'anms-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;
  candidateSchedules: CandidateScheduleContentModel[];
  numTodaySchedules: number = 0;

  greeting: string;
  now: moment.Moment = moment();
  userFirstName: string;

  constructor(
    private principal: Principal,
    private candidateScheduleService: CandidateScheduleService,
  ) { }

  ngOnInit() {
    this.fetch();
    this.generateGreeting();

    this.principal.identity()
      .then(r => this.userFirstName = r.firstName);

  }

  fetch() {
    this.isLoading = true;
    this.isErrorOccured = false;
    this.candidateScheduleService.getList().subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.candidateSchedules = r.data.content;
        this.numTodaySchedules = this.candidateSchedules.filter(s => moment(s.data.startDate).isSame(this.now, 'day')).length;
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }

  private generateGreeting() {
    const currentHour = moment().get('hour');
    if (currentHour >= 12 && currentHour <= 17)
      this.greeting = 'ظهر بخیر';
    else if (currentHour >= 17)
      this.greeting = 'شب بخیر';
    else
      this.greeting = 'صبح بخیر';
  }
}
