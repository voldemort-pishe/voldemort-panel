import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { JobService } from "@app/shared/services/data/job.service";
import { ProvinceService } from "@app/shared/services/data/province.service";
import { JobType } from "@app/shared/model/enumeration/job-type";
import { CompanyMemberService } from "@app/shared/services/data/company-member.service";
import { JobHireTeamService } from "@app/shared/services/data/job-hire-team.service";
import { JobHireTeamRole } from '@app/shared/model/enumeration/job-hire-team-role';
import { HelpersService } from '@app/shared/services/helpers.service';
import { JobModel } from '@app/shared/model/job.model';
import { Router } from '@angular/router';
import { CompanyMemberContentModel } from '@app/shared/model/company-member.model';
import { JobHireTeamModel } from '@app/shared/model/job-hiring-team.model';

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

  selectedHiringManagers: CompanyMemberContentModel[] = [];
  selectedRecruiters: CompanyMemberContentModel[] = [];
  selectedCoordinators: CompanyMemberContentModel[] = [];

  isSubmitting: boolean = false;

  public get areAllFormsValid(): boolean {
    return this.jobInfoFormGroup.valid && this.jobDescriptionFormGroup.valid;
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
          return this.jobHireTeamService.create(jobId, this.getHireTeamModels())
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

  getHireTeamModels(): JobHireTeamModel[] {
    const result: JobHireTeamModel[] = [];
    this.selectedHiringManagers.forEach(m =>
      result.push({ userId: m.include.user.id, role: JobHireTeamRole.HiringManager })
    );
    this.selectedRecruiters.forEach(m =>
      result.push({ userId: m.include.user.id, role: JobHireTeamRole.Recruiter })
    );
    this.selectedCoordinators.forEach(m =>
      result.push({ userId: m.include.user.id, role: JobHireTeamRole.Coordinator })
    );
    return result;
  }

  private generateForms(): void {
    this.jobInfoFormGroup  = new FormGroup({
      nameFa: new FormControl(null, Validators.required),
      nameEn: new FormControl(null),
      department: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      language: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });

    this.jobDescriptionFormGroup = this.fb.group({
      descriptionFa: [null, Validators.required],
    });
  }
}
