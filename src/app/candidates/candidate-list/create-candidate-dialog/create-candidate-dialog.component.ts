import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CandidateCreateDialog } from '@app/secure';
import { UploadService, CandidateService, CompanyPipelineService, JobService } from '@app/core';
import { CandidateType } from '@app/shared/model/enumeration/candidate-type.model';
import { CandidateState } from '@app/shared/model/enumeration/candidate-state.model';
import { forkJoin } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Candidate } from '@app/shared/model/candidate.model';
import { CompanyPipelineContentModel } from '@app/shared/model/company-pipeline-vm.model';
import { JobContentModel } from '@app/shared/model/job-vm.model';

@Component({
  selector: 'anms-create-candidate-dialog',
  templateUrl: './create-candidate-dialog.component.html',
  styleUrls: ['./create-candidate-dialog.component.scss']
})
export class CreateCandidateDialogComponent implements OnInit {

  @ViewChild('candidateCreateForm') candidateCreateForm: ElementRef;
  @ViewChild('file') file;

  candidateCreateFormGroup: FormGroup;
  candidateType: object;
  candidateState: object;
  files: Set<File> = new Set();
  uploading = false;
  uploadSuccessful = false;
  uploadResponse;

  companyPipeline: CompanyPipelineContentModel[];
  jobList: JobContentModel[];

  constructor(
    private dialogRef: MatDialogRef<CandidateCreateDialog>,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private candidateService: CandidateService,
    private companyPipelineService: CompanyPipelineService,
    private jobService: JobService,
    private snackBar: MatSnackBar,
  ) {

    this.candidateCreateFormGroup = fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      state: ['', Validators.required],
      cellphone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      type: ['', Validators.required],
      candidatePipeline: ['', Validators.required],
      employer: [null, Validators.required],
      jobId: ['', Validators.required],
      fileId: new FormControl()
    });

  }

  ngOnInit() {
    this.candidateType = Object.keys(CandidateType)
      .map(c => ({
        key: c,
        value: CandidateType[c]
      }));

    this.candidateState = Object.keys(CandidateState)
      .map(c => ({
        key: c,
        value: CandidateState[c]
      }));

    this.companyPipelineService.getList().subscribe(r => {
      if (r.success)
        this.companyPipeline = r.data.content;
    });

    this.jobService.getList().subscribe(r => {
      if (r.success)
        this.jobList = r.data.content;
    });
  }

  addFiles() {
    this.file.nativeElement.click();
    return false;
  }

  onFilesAdded() {

    this.uploading = true;

    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }

    this.uploadResponse = this.uploadService.upload(this.files);
    forkJoin(this.uploadResponse.filestatus.progress).subscribe(end => {
      this.uploadSuccessful = true;
      this.uploading = false;
      this.candidateCreateFormGroup.patchValue({
        fileId: this.uploadResponse.response.body.id
      });
    });

  }

  save() {
    if (this.candidateCreateFormGroup.valid) {
      this.candidateService
        .create(this.candidateCreateFormGroup.value)
        .subscribe(
          (res: HttpResponse<Candidate>) => this.onCreateCandidateSuccess(res.body),
          (res: HttpErrorResponse) => this.onError(res)
        );
    }
  }

  private onCreateCandidateSuccess(data: Candidate) {
    this.dialogRef.close();
    this.snackBar.open("کاندیدای مورد نظر با موفقیت ثبت شد", "بستن", {
      duration: 2500
    });
  }


  private onError(httpResponse: HttpErrorResponse) {

    if (httpResponse.error.message == "error.validation") {

      httpResponse.error.fieldErrors.forEach((key: any, val: any) => {
        if (key.message == "NotNull" && key.field == 'fileId') {
          this.snackBar.open("روزمه اجباری است", "بستن", {
            duration: 2500
          });
        }
      });
    }
  }
}
