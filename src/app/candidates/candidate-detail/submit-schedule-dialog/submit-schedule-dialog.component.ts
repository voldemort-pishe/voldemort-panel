import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatAutocomplete, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatAutocompleteSelectedEvent, MatDatepickerInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { CompanyMemberModel } from '@app/shared/model/company-member/company-member.model';
import { CandidateScheduleMemberModel } from '@app/shared/model/candidate-schedule/candidate-schedule-member.model';
import { CompanyMemberPage } from '@app/shared/model/company-member/company-member-page.model';
import { CompanyMemberService, CandidateScheduleService } from '@app/core';
import { CandidateScheduleModel } from '@app/shared/model/candidate-schedule/candidate-schedule.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CandidateScheduleContentModel } from '@app/shared/model/candidate-schedule/candidate-schedule-vm.model';
import { startWith, map } from 'rxjs/operators';
import * as jalaliMoment from "jalali-moment";

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
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredMember: Observable<CompanyMemberModel[]>;
  memberSet: Set<CandidateScheduleMemberModel> = new Set();
  memberList: Array<CandidateScheduleMemberModel> = [];
  companyMemberPage: CompanyMemberPage;
  timeList: jalaliMoment.Moment[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubmitScheduleDialogComponent>,
    private companyMemberService: CompanyMemberService,
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
    this.companyMemberService
      .getList()
      .subscribe(r => {
        if (r.success) this.onCompanyMemberSuccess(r.data);
        else this.onError(r.error.message);
      });
  }

  remove(member: CandidateScheduleMemberModel): void {
    this.memberSet.delete(member);

    let index = this.memberList
      .map(function (e) {
        return e.userId;
      }).indexOf(member.userId);
    if (index > -1) {
      console.log(member);
      this.memberList.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    let candidateScheduleMember = new CandidateScheduleMemberModel();
    candidateScheduleMember.userId = event.option.value.id;
    candidateScheduleMember.candidateScheduleId = Number(this.data.candidateId);
    this.memberList.push(candidateScheduleMember);
    this.memberSet.add(event.option.value);
    this.memberInput.nativeElement.value = '';
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.generateTime();
  }

  addSchedule() {
    let candidateSchedule: CandidateScheduleModel = new CandidateScheduleModel();
    candidateSchedule.member = this.memberList;
    candidateSchedule.candidateId = this.data.candidateId;
    candidateSchedule.description = this.candidateAddScheduleFormGroup.value.description;
    candidateSchedule.startDate = this.candidateAddScheduleFormGroup.value.startTime;
    candidateSchedule.endDate = this.candidateAddScheduleFormGroup.value.endTime;
    candidateSchedule.location = this.candidateAddScheduleFormGroup.value.location;
    if (this.candidateAddScheduleFormGroup.valid) {
      this.candidateScheduleService
        .create(candidateSchedule)
        .subscribe(
          (res: HttpResponse<CandidateScheduleContentModel>) => this.onCreateScheduleSuccess(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
  }

  private onCompanyMemberSuccess(data: CompanyMemberPage) {
    this.companyMemberPage = data;
    this.filteredMember = this.candidateAddScheduleFormGroup.controls['memberCtrl'].valueChanges.pipe(
      startWith(null),
      map((userEmail: string | null) => {
        return userEmail ? this._filter(userEmail) : this.companyMemberPage.content.map(e => { return e.data });
      }));
  }

  private onCreateScheduleSuccess(data: CandidateScheduleContentModel) {
    this.dialogRef.close(true);
    this.snackBar.open("مصاحبه با موفقیت ثبت شد", "بستن", {
      duration: 2500
    });
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }


  private _filter(value: string): CompanyMemberModel[] {
    return this.companyMemberPage.content
      .filter(e => {
        return e.data.userEmail.includes(value);
      })
      .map(e => { return e.data });
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
