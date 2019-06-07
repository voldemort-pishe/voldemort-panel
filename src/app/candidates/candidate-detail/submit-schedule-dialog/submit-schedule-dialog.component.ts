import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as moment from 'jalali-moment';
import { CandidateScheduleService } from '@app/shared/services/data/candidate-schedule.service';
import { CompanyMemberContentModel } from '@app/shared/model/company-member.model';

@Component({
  selector: 'anms-submit-schedule-dialog',
  templateUrl: './submit-schedule-dialog.component.html',
  styleUrls: ['./submit-schedule-dialog.component.scss']
})
export class SubmitScheduleDialogComponent implements OnInit {

  form: FormGroup;
  memberArray: FormArray;
  timesteps: moment.Moment[];
  isLoading: boolean = false;

  private _selectedDate: moment.Moment;
  public get selectedDate(): moment.Moment {
    return this._selectedDate;
  }
  public set selectedDate(v: moment.Moment) {
    this._selectedDate = v;
    this.updateStartDate();
    this.updateEndDate();
  }

  private _startTime: moment.Moment;
  public get startTime(): moment.Moment {
    return this._startTime;
  }
  public set startTime(v: moment.Moment) {
    this._startTime = v;
    this.updateStartDate();
  }

  private _endTime: moment.Moment;
  public get endTime(): moment.Moment {
    return this._endTime;
  }
  public set endTime(v: moment.Moment) {
    this._endTime = v;
    this.updateEndDate();
  }

  constructor(
    private dialogRef: MatDialogRef<SubmitScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { candidateId: number },
    private snackBar: MatSnackBar,
    private candidateScheduleService: CandidateScheduleService,
  ) {
  }

  ngOnInit(): void {
    console.log(moment().toString())
    console.log(moment().utc(true).toString())
    console.log(moment().utc(false).toString())
    console.log(moment().utc(true).locale('fa').toString())
    console.log(moment().utc(false).locale('fa').toString())
    console.log(moment().locale('fa').toString())
    console.log(moment().toJSON())
    console.log(moment().utc(true).toJSON())
    console.log(moment().utc(false).toJSON())
    console.log(moment().utc(true).locale('fa').toJSON())
    console.log(moment().utc(false).locale('fa').toJSON())
    console.log(moment().locale('fa').toJSON())
    this.form = new FormGroup({
      candidateId: new FormControl(this.data.candidateId, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      member: new FormArray([], Validators.required),
    });

    this.generateTimesteps();
    this._selectedDate = moment().hour(0).minute(0).second(0).millisecond(0);
    this.startTime = this.timesteps[0];
    this.endTime = this.timesteps[0];
  }

  onSelectedMembersChange(members: CompanyMemberContentModel[]): void {
    this.memberArray = new FormArray([]);
    members.forEach(m => {
      this.memberArray.push(new FormGroup({
        userId: new FormControl(m.include.user.id),
        candidateScheduleId: new FormControl(Number(this.data.candidateId)),
      }));
    });
    this.form.setControl('member', this.memberArray);
  }

  submit() {
    if (this.form.invalid || this.isLoading) return;

    this.isLoading = true;
    this.candidateScheduleService.create(this.form.value).subscribe(r => {
      this.isLoading = false;
      const msg = r.success ? 'مصاحبه با موفقیت ثبت شد' : r.niceErrorMessage;
      this.snackBar.open(msg, null, { duration: 2500 });
      if (r.success)
        this.dialogRef.close(true);
    });
  }

  private updateStartDate(): void {
    console.log(this.selectedDate.clone())
    this.form.patchValue({
      startDate: this.selectedDate.clone()
        .hour(this.startTime.hour())
        .minute(this.startTime.minute()),
    });
  }

  private updateEndDate(): void {
    this.form.patchValue({
      endDate: this.selectedDate.clone()
        .hour(this.endTime.hour())
        .minute(this.endTime.minute()),
    });
  }

  private generateTimesteps() {
    const quarterHours = [0, 30];
    this.timesteps = [];
    for (let h = 0; h < 24; h++)
      for (let m = 0; m < quarterHours.length; m++)
        this.timesteps.push(moment().hour(h).minute(quarterHours[m]));
  }
}
