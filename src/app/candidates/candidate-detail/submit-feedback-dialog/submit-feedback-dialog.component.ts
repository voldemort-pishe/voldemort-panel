import { Component, OnInit, Inject } from '@angular/core';
import { FeedbackService } from '@app/core/services/feedback.service';
import { HelpersService } from '@app/core/services/helpers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '@app/core/auth/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'anms-submit-feedback-dialog',
  templateUrl: './submit-feedback-dialog.component.html',
  styleUrls: ['./submit-feedback-dialog.component.scss']
})
export class SubmitFeedbackDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private accountService: AccountService,
    private feedbackService: FeedbackService,
    private helpersService: HelpersService,
    private dialogRef: MatDialogRef<SubmitFeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      candidateId: new FormControl(this.data.candidateId, Validators.required),
      feedbackText: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      userId: new FormControl(this.accountService.account.id, Validators.required)
    });
  }

  submit(): void {
    this.feedbackService.create(this.form.value).subscribe(r => {
      const msg = r.success ? 'بازخورد شما با موفقیت ثبت شد.' : r.niceErrorMessage;
      this.helpersService.showToast(msg);
      this.dialogRef.close();
    });
  }
}
