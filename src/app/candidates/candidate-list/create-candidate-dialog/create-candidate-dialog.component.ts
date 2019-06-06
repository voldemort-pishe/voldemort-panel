import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UploadService } from '@app/shared/services/data/upload.service';
import { CandidateService } from '@app/shared/services/data/candidate.service';
import { CompanyPipelineService } from '@app/shared/services/data/company-pipeline.service';
import { JobService } from '@app/shared/services/data/job.service';
import { CandidateType } from '@app/shared/model/enumeration/candidate-type';
import { CandidateState } from '@app/shared/model/enumeration/candidate-state';
import { forkJoin } from 'rxjs';
import { CompanyPipelineContentModel } from '@app/shared/model/company-pipeline.model';
import { JobContentModel } from '@app/shared/model/job.model';
import { CandidateContentModel } from '@app/shared/model/candidate.model';

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
    private dialogRef: MatDialogRef<CreateCandidateDialogComponent>,
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
      this.candidateService.create(this.candidateCreateFormGroup.value).subscribe(r => {
        if (r.success)
          this.onCreateCandidateSuccess(r.data);
        else
          this.onError(r.error);
      });
    }
  }

  private onCreateCandidateSuccess(data: CandidateContentModel) {
    this.dialogRef.close();
    this.snackBar.open("کاندیدای مورد نظر با موفقیت ثبت شد", "بستن", {
      duration: 2500
    });
  }


  private onError(error: any) {
    if (error.message == "error.validation") {
      error.fieldErrors.forEach((key: any, val: any) => {
        if (key.message == "NotNull" && key.field == 'fileId') {
          this.snackBar.open("روزمه اجباری است", "بستن", {
            duration: 2500
          });
        }
      });
    }
  }
}
