import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CandidatePageComponent } from '@app/secure';
import { CandidateMessageService } from '@app/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'anms-send-email-dialog',
  templateUrl: './send-email-dialog.component.html',
  styleUrls: ['./send-email-dialog.component.scss']
})
export class SendEmailDialogComponent implements OnInit {

  @ViewChild('candidateEmailForm') candidateEmailForm: ElementRef;
  candidateEmailFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CandidatePageComponent>,
    private candidateMessageService: CandidateMessageService,
    private snackBar: MatSnackBar) {

    this.candidateEmailFormGroup = fb.group({
      subject: [null, Validators.required],
      message: [null, Validators.required],
      candidateId: new FormControl()
    });


  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.candidateEmailFormGroup.patchValue({
      candidateId: this.data.candidateId
    });
    this.candidateMessageService
      .create(this.candidateEmailFormGroup.value)
      .subscribe(
        (res: HttpResponse<any>) => this.onCandidateMessageSuccess(),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onCandidateMessageSuccess() {
    this.dialogRef.close(true);
    this.snackBar.open("پیام شما با موفقیت ارسال شد", "بستن", {
      duration: 2500
    });
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }
}
