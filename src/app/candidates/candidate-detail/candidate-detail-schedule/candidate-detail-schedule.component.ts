import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateScheduleService } from '@app/core';
import { CandidateScheduleContentModel } from '@app/shared/model/candidate-schedule/candidate-schedule-vm.model';
import { MatDialog } from '@angular/material';
import { SubmitScheduleDialogComponent } from '../submit-schedule-dialog/submit-schedule-dialog.component';

@Component({
  selector: 'anms-candidate-detail-schedule',
  templateUrl: './candidate-detail-schedule.component.html',
  styleUrls: ['./candidate-detail-schedule.component.scss']
})
export class CandidateDetailScheduleComponent implements OnInit {

  candidateId: number;

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;
  schedules: CandidateScheduleContentModel[];

  constructor(
    private route: ActivatedRoute,
    private candidateScheduleService: CandidateScheduleService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'));
      if (!isNaN(id)) {
        this.candidateId = id;
        this.fetch();
      }
    });
  }

  fetch() {
    if (this.candidateId == null) return;

    this.isLoading = true;
    this.isErrorOccured = false;
    this.candidateScheduleService.getListByCandidate(this.candidateId).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.schedules = r.data.content;
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }

  newSchedule(): void {
    this.dialog.open(SubmitScheduleDialogComponent, { data: { candidateId: this.candidateId } });
  }
}
