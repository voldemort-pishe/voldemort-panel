import { Component, OnInit, Inject } from '@angular/core';
import { HelpersService } from '@app/shared/services/helpers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from '@app/shared/services/data/account.service';
import { FeedbackService } from '@app/shared/services/data/feedback.service';

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
      userId: new FormControl(null, Validators.required)
    });

    // TODO: I should not send userId, server must determine it from token
    this.accountService.get().subscribe(r => {
      if (r.success)
        this.form.patchValue({ userId: r.data.id });
    });
  }

  submit(): void {
    this.feedbackService.create(this.form.value).subscribe(r => {
      const msg = r.success ? 'بازخورد شما با موفقیت ثبت شد.' : r.niceErrorMessage;
      this.helpersService.showToast(msg);
      this.dialogRef.close(r.success);
    });
  }
}
