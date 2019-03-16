import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '@app/core/services/api.service';
import { AccountService } from '@app/core/auth/account.service';

@Component({
  selector: 'anms-submit-feedback',
  templateUrl: './submit-feedback.component.html',
  styleUrls: ['./submit-feedback.component.scss']
})
export class SubmitFeedbackComponent implements OnInit {

  form: FormGroup;

  constructor(
    private accountService: AccountService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SubmitFeedbackComponent>,
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
    this.apiService.post<any>('feedback', this.form.value).subscribe(r => {
      const msg = r.success ? 'بازخورد شما با موفقیت ثبت شد.' : r.niceErrorMessage;
      this.snackBar.open(msg, null, { duration: 3000 });
      this.dialogRef.close();
    });
  }
}
