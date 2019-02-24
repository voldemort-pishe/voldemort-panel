import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import {
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatDialogRef,
  MatSnackBar,
  MatStepper,
} from "@angular/material";
import { JobService } from "@app/core/services/job.service";
import { JobContentModel } from "@app/shared/model/job-vm.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProvinceService } from "@app/core/services/province.service";
import { Province } from "@app/shared/model/province.model";
import { JobType } from "@app/shared/model/enumeration/job-type.model";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { CompanyMemberService } from "@app/core/services/company-member.service";
import { CompanyMemberPage } from "@app/shared/model/company-member/company-member-page.model";
import { CompanyMemberModel } from "@app/shared/model/company-member/company-member.model";
import { JobHireTeamService } from "@app/core/services/job-hire-team.service";
import { JobHiringTeamPage } from "@app/shared/model/job-hiring-team/job-hiring-team-page.model";

@Component({
  selector: 'anms-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  @ViewChild('jobCreateForm') jobCreateForm: ElementRef;
  @ViewChild('stepper') private myStepper: MatStepper;
  @ViewChild('hiringManagers') hiringManagers: ElementRef<HTMLInputElement>;
  @ViewChild('recruiter') recruiter: ElementRef<HTMLInputElement>;
  @ViewChild('coordinator') coordinator: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  enableForward = false;
  BasicsJobCreateFormGroup: FormGroup;
  DescJobCreateFormGroup: FormGroup;
  HiringTeamFormGroup: FormGroup;
  StagesJobCreateFormGroup: FormGroup;
  jobType: object;
  jobLocation;

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  jobId: number;

  hiringManagersFa = new FormControl();
  recruiterFa = new FormControl();
  coordinatorFa = new FormControl();

  filteredMember: Observable<CompanyMemberModel[]>;
  JobHiringTeam = [];
  companyMemberPage: CompanyMemberPage;

  hiringTeamList = [
    {
      role: 'ROLE_HIRING_MANAGER',
      formCtrl: this.hiringManagersFa,
      placeholder: 'مدیران استخدام',
      viewId: this.hiringManagers
    },
    {
      role: 'ROLE_RECRUITER',
      formCtrl: this.recruiterFa,
      placeholder: 'استخدام کننده ها',
      viewId: this.recruiter
    },
    {
      role: 'ROLE_COORDINATOR',
      formCtrl: this.coordinatorFa,
      placeholder: 'هماهنگ کننده ها',
      viewId: this.coordinator
    },
  ];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateJobComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private provinceService: ProvinceService,
    private jobService: JobService,
    private companyMemberService: CompanyMemberService,
    private jobHireTeamService: JobHireTeamService,
  ) {

    this.BasicsJobCreateFormGroup = fb.group({
      nameFa: [null, Validators.required],
      type: ['', Validators.required],
      department: [null, Validators.required],
      location: ['', Validators.required],
    });

    this.DescJobCreateFormGroup = fb.group({
      descriptionFa: [null, Validators.required],
    });

    this.HiringTeamFormGroup = fb.group({
      hiringManagersFa: [null, Validators.required],
      recruiterFa: [null, Validators.required],
      cordinatorFa: [null, Validators.required]
    });

    this.StagesJobCreateFormGroup = fb.group({
      hiringProcessFa: [null, Validators.required],
    });
  }

  ngOnInit(): void {

    // province list init
    this.provinceService
      .loadAll()
      .subscribe(
        (res: HttpResponse<Province[]>) => this.onProvinceFind(res.body),
        (res: HttpErrorResponse) => this.onError(res.message));

    // job type list init
    this.jobType = Object.keys(JobType)
      .map(c => ({
        key: c,
        value: JobType[c]
      }));

  }

  private onProvinceFind(data: Province[]) {
    this.jobLocation = data;
  }

  BasicInfos(stepper) {
    const basicData = Object.assign(this.BasicsJobCreateFormGroup.value, this.DescJobCreateFormGroup.value);
    if (this.DescJobCreateFormGroup.valid) {
      this.jobService
        .create(basicData)
        .subscribe(
          (res: HttpResponse<JobContentModel>) => {
            this.jobId = res.body.data.id;
            return (res.status) === 201 ? stepper.next() : '';
          },
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
  }

  private onCreateJobSuccess() {
    this.dialogRef.close();
    this.snackBar.open("شغل مورد نظر با موفقیت ثبت شد", "بستن", {
      duration: 2500
    });
  }


  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

  searchByEmail(ctrl): void {
    this.companyMemberService
      .searchByEmail(ctrl.value)
      .subscribe(
        (res: HttpResponse<CompanyMemberPage>) => this.onCompanyMemberSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message));
  }

  private onCompanyMemberSuccess(data: CompanyMemberPage) {
    this.companyMemberPage = data;
  }


  submitHiringTeam() {
    if (this.DescJobCreateFormGroup.valid)
      this.jobHireTeamService
        .create({
          jobId: this.jobId,
          teams: this.JobHiringTeam.map(job => ({
            userId: job.userId,
            role: job.role
          }))
        })
        .subscribe(
          (res: HttpResponse<JobHiringTeamPage>) => this.onCreateJobSuccess(),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
  }
}
