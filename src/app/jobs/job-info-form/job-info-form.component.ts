import { Component, OnInit, Input } from '@angular/core';
import { JobType } from '@app/shared/model/enumeration/job-type';
import { JobStatus } from '@app/shared/model/enumeration/job-status';
import { LanguageType } from '@app/shared/model/enumeration/language-type';
import { FormGroup } from '@angular/forms';
import { ProvinceService } from '@app/shared/services/data/province.service';

@Component({
  selector: 'anms-job-info-form',
  templateUrl: './job-info-form.component.html',
  styleUrls: ['./job-info-form.component.scss']
})
export class JobInfoFormComponent implements OnInit {

  JobTypes: JobType[] = Object.values(JobType);
  JobStatuses: JobStatus[] = Object.values(JobStatus);
  LanguageTypes: LanguageType[] = Object.values(LanguageType);

  @Input() form: FormGroup;

  provinceNames: string[];

  constructor(
    private provinceService: ProvinceService,
  ) { }

  ngOnInit() {
    this.provinceService.getList().subscribe(r => {
      if (r.success) this.provinceNames = r.data.map(p => p.name);
    });
  }
}
