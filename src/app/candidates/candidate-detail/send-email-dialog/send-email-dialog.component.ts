import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CandidateMessageService } from '@app/shared/services/data/candidate-message.service';
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
    private dialogRef: MatDialogRef<SendEmailDialogComponent>,
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
    this.candidateMessageService.create(this.candidateEmailFormGroup.value).subscribe(r => {
      if (r.success)
        this.onCandidateMessageSuccess();
    });
  }

  private onCandidateMessageSuccess() {
    this.dialogRef.close(true);
    this.snackBar.open("پیام شما با موفقیت ارسال شد", "بستن", {
      duration: 2500
    });
  }
}
