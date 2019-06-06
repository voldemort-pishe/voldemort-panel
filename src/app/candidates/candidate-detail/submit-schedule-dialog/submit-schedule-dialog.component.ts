import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatAutocomplete, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CandidateScheduleService } from '@app/shared/services/data/candidate-schedule.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import * as jalaliMoment from "jalali-moment";
import { CandidateScheduleMemberModel } from '@app/shared/model/candidate-schedule-member.model';
import { CompanyMemberContentModel } from '@app/shared/model/company-member.model';
import { CandidateScheduleContentModel, CandidateScheduleModel } from '@app/shared/model/candidate-schedule.model';

@Component({
  selector: 'anms-submit-schedule-dialog',
  templateUrl: './submit-schedule-dialog.component.html',
  styleUrls: ['./submit-schedule-dialog.component.scss']
})
export class SubmitScheduleDialogComponent implements OnInit {

  @ViewChild('candidateAddScheduleForm') candidateAddScheduleForm: ElementRef;
  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  candidateAddScheduleFormGroup: FormGroup;
  today = jalaliMoment();
  memberList: CandidateScheduleMemberModel[] = [];
  timeList: jalaliMoment.Moment[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    fb: FormBuilder,
    private dialogRef: MatDialogRef<SubmitScheduleDialogComponent>,
    private snackBar: MatSnackBar,
    private candidateScheduleService: CandidateScheduleService) {

    this.candidateAddScheduleFormGroup = fb.group({
      date: [this.today, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      location: [null, Validators.required],
      description: [null, Validators.required],
      memberCtrl: [null, Validators.required]
    });

    this.generateTime();
  }

  ngOnInit(): void {
  }

  onSelectedMembersChange(members: CompanyMemberContentModel[]): void {
    this.memberList = members.map(m => {
      return {
        userId: m.include.user.id,
        candidateScheduleId: Number(this.data.candidateId),
      };
    });
  }

  onDateChange() {
    this.generateTime();
  }

  addSchedule() {
    let candidateSchedule: CandidateScheduleModel = {};
    candidateSchedule.member = this.memberList;
    candidateSchedule.candidateId = this.data.candidateId;
    candidateSchedule.description = this.candidateAddScheduleFormGroup.value.description;
    candidateSchedule.startDate = this.candidateAddScheduleFormGroup.value.startTime;
    candidateSchedule.endDate = this.candidateAddScheduleFormGroup.value.endTime;
    candidateSchedule.location = this.candidateAddScheduleFormGroup.value.location;
    if (this.candidateAddScheduleFormGroup.valid) {
      this.candidateScheduleService.create(candidateSchedule).subscribe(r => {
        if (r.success)
          this.onCreateScheduleSuccess();
      });
    }
  }

  private onCreateScheduleSuccess() {
    this.dialogRef.close(true);
    this.snackBar.open("مصاحبه با موفقیت ثبت شد", "بستن", {
      duration: 2500
    });
  }

  private generateTime() {
    this.timeList = [];
    let quarterHours = ["00", "30"];
    for (let _i = 0; _i < 24; _i++) {
      for (let _j = 0; _j < 2; _j++) {
        this.timeList.push(
          jalaliMoment(this.candidateAddScheduleFormGroup.value.date
            .format("YYYY-MM-DD") + " " + String(_i).padStart(2, '0') + ":" + quarterHours[_j])
        );
      }
    }
  }
}
