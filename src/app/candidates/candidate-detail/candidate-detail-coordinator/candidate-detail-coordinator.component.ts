import { Component, OnInit } from '@angular/core';
import { CandidateContentModel } from '@app/shared/model/candidate.model';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '@app/core';
import { SendEmailDialogComponent } from '../send-email-dialog/send-email-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'anms-candidate-detail-coordinator',
  templateUrl: './candidate-detail-coordinator.component.html',
  styleUrls: ['./candidate-detail-coordinator.component.scss']
})
export class CandidateDetailCoordinatorComponent implements OnInit {

  id: number;

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;
  model: CandidateContentModel;

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.fetch();
    });
  }

  fetch() {
    if (this.id == null) return;

    this.isLoading = true;
    this.isErrorOccured = false;
    this.candidateService.getDetail(this.id).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.model = r.data;
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }

  sendEmail(): void {
    this.dialog.open(SendEmailDialogComponent, { data: { candidateId: this.id } });
  }
}
