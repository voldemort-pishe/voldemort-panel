import { Component, OnInit } from '@angular/core';
import { JobService } from '@app/shared/services/data/job.service';
import { ActivatedRoute } from '@angular/router';
import { JobContentModel } from '@app/shared/model/job.model';
import { FormGroup, FormControl } from '@angular/forms';
import { HelpersService } from '@app/shared/services/helpers.service';
import { JobType } from '@app/shared/model/enumeration/job-type';
import { ProvinceService } from '@app/shared/services/data/province.service';
import { JobStatus } from '@app/shared/model/enumeration/job-status';
import { LanguageType } from '@app/shared/model/enumeration/language-type';

@Component({
  selector: 'anms-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit {

  JobTypes: JobType[] = Object.values(JobType);
  JobStatuses: JobStatus[] = Object.values(JobStatus);
  LanguageTypes: LanguageType[] = Object.values(LanguageType);

  id: number;
  form: FormGroup;
  model: JobContentModel;
  provinceNames: string[];
  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      // [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      // ['link', 'image', 'video']                         // link and image, video
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private helpersService: HelpersService,
    private provinceService: ProvinceService,

  ) { }

  ngOnInit() {
    this.generateForm();

    this.provinceService.getList().subscribe(r => {
      if (r.success) this.provinceNames = r.data.map(p => p.name);
    });


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
      companyId: new FormControl(null),
      // createdDate: new FormControl(null),
      department: new FormControl(null),
      descriptionEn: new FormControl(null),
      descriptionFa: new FormControl(null),
      id: new FormControl(null),
      language: new FormControl(null),
      location: new FormControl(null),
      nameEn: new FormControl(null),
      nameFa: new FormControl(null),
      status: new FormControl(null),
      type: new FormControl(null),
      uniqueId: new FormControl(null),
    });
  }
}
