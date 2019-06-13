import { Component, OnInit } from '@angular/core';
import { JobService } from '@app/shared/services/data/job.service';
import { ActivatedRoute } from '@angular/router';
import { JobContentModel } from '@app/shared/model/job.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelpersService } from '@app/shared/services/helpers.service';

@Component({
  selector: 'anms-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit {

  id: number;
  form: FormGroup;
  model: JobContentModel;
  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private helpersService: HelpersService,

  ) { }

  ngOnInit() {
    this.generateForm();

    this.route.parent.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.fetch();
    });
  }

  fetch(): void {
    if (isNaN(this.id) || this.isLoading) return;

    this.isErrorOccured = false;
    this.isLoading = true;
    this.jobService.getDetail(this.id).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.model = r.data;
        this.form.patchValue(this.model.data);
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }

  save(): void {
    this.jobService.update(this.form.value).subscribe(r => {
      this.helpersService.showToast(r.success ? 'نغییرات با موفقیت ذخیره شد.' : r.niceErrorMessage);
    });
  }

  private generateForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null, Validators.required),
      uniqueId: new FormControl(null, Validators.required),
      companyId: new FormControl(null, Validators.required),
      nameFa: new FormControl(null, Validators.required),
      nameEn: new FormControl(null),
      department: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      language: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      createdDate: new FormControl(null),
      descriptionFa: new FormControl(null, Validators.required),
      descriptionEn: new FormControl(null),
    });

    this.form.get('createdDate').disable();
  }
}
