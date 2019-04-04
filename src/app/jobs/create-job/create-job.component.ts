import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatAutocompleteSelectedEvent, } from "@angular/material";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { JobService } from "@app/core/services/job.service";
import { ProvinceService } from "@app/core/services/province.service";
import { JobType } from "@app/shared/model/enumeration/job-type.model";
import { CompanyMemberService } from "@app/core/services/company-member.service";
import { JobHireTeamService } from "@app/core/services/job-hire-team.service";
import { CompanyMemberContentModel } from '@app/shared/model/company-member/company-member-vm.model';
import { JobHireTeamRole } from '@app/shared/model/enumeration/job-hire-team-role';
import { HelpersService } from '@app/core/services/helpers.service';
import { JobModel } from '@app/shared/model/job.model';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  JobTypes: JobType[] = Object.values(JobType);
  JobHireTeamRoles: JobHireTeamRole[] = Object.values(JobHireTeamRole);

  provinceNames: string[] = [];
  companyMembers: CompanyMemberContentModel[] = [];

  jobInfoFormGroup: FormGroup;
  jobDescriptionFormGroup: FormGroup;
  hireTeamFormArray: FormArray;

  isSubmitting: boolean = false;

  public get areAllFormsValid(): boolean {
    return this.jobInfoFormGroup.valid && this.jobDescriptionFormGroup.valid && this.hireTeamFormArray.valid;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<CreateJobComponent>,
    private helpersService: HelpersService,
    private provinceService: ProvinceService,
    private jobService: JobService,
    private companyMemberService: CompanyMemberService,
    private jobHireTeamService: JobHireTeamService,
  ) { }

  ngOnInit(): void {
    this.generateForms();

    this.provinceService.getList().subscribe(r => {
      if (r.success) this.provinceNames = r.data.map(p => p.name);
    });

    this.companyMemberService.getList().subscribe(r => {
      if (r.success) this.companyMembers = r.data.content;
    });
  }

  submit(): void {
    if (this.isSubmitting || !this.areAllFormsValid) return;
    this.isSubmitting = true;

    const jobModel: JobModel = { ...this.jobInfoFormGroup.value, ...this.jobDescriptionFormGroup.value };
    this.jobService.create(jobModel).pipe(
      mergeMap(jobResult => {
        if (jobResult.success) {
          const jobId = jobResult.data.data.id;
          return this.jobHireTeamService.create(jobId, this.hireTeamFormArray.value)
            .pipe(map(r => { return { result: r, jobId: jobId }; }));
        }
        else
          return of(jobResult).pipe(map(r => { return { result: r, jobId: null }; }));
      })).subscribe(r => {
        const msg = r.result.success ? 'شغل مورد نظر با موفقیت ثبت شد.' : r.result.niceErrorMessage;
        this.helpersService.showToast(msg);
        this.isSubmitting = false;
        if (r.result.success)
          this.router.navigate(['job', r.jobId]);
        this.dialogRef.close();
      });
  }

  addHireTeamMember(): void {
    this.hireTeamFormArray.push(this.fb.group({
      userId: [null, Validators.required],
      role: [null, Validators.required],
    }));
  }

  removeHireTeamMember(i: number): void {
    this.hireTeamFormArray.removeAt(i);
  }

  getCompanyMemberDisplay(companyMember: CompanyMemberContentModel): string {
    return companyMember ? `${companyMember.include.user.firstName} ${companyMember.include.user.lastName}` : null;
  }

  onCompanyMemberSelected(event: MatAutocompleteSelectedEvent, index: number): void {
    const val: CompanyMemberContentModel = event.option.value;
    this.hireTeamFormArray.controls[index].get('userId').setValue(val.include.user.id);
  }

  private generateForms(): void {
    this.jobInfoFormGroup = this.fb.group({
      nameFa: [null, Validators.required],
      type: [null, Validators.required],
      department: [null, Validators.required],
      location: [null, Validators.required],
    });

    this.jobDescriptionFormGroup = this.fb.group({
      descriptionFa: [null, Validators.required],
    });

    this.hireTeamFormArray = this.fb.array([], Validators.required);
  }
}
