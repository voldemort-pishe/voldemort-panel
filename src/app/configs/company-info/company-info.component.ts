import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from '@app/core';
import { HelpersService } from '@app/core/services/helpers.service';
import { CompanyContentModel } from '@app/shared/model/company.model';

@Component({
  selector: 'anms-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  form: FormGroup;
  model: CompanyContentModel;

  constructor(
    private companyService: CompanyService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.generateForm();
    this.fetch();
  }

  private fetch(): void {
    this.companyService.get().subscribe(r => {
      if (r.success) {
        this.model = r.data;
        this.fillFormFromModel();
      }
    });
  }

  save(): void {
    this.companyService.update(this.form.value).subscribe(r => {
      this.helpersService.showToast(r.success ? 'نغییرات با موفقیت ذخیره شد.' : r.niceErrorMessage);
    });
  }

  private fillFormFromModel(): void {
    if (!this.form) return;
    this.form.patchValue(this.model.data);
  }

  private generateForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      nameFa: new FormControl(null, Validators.required),
      descriptionEn: new FormControl(null, Validators.required),
      descriptionFa: new FormControl(null, Validators.required),
      fileId: new FormControl(null, Validators.required),
      language: new FormControl(null, Validators.required),
      subDomain: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required),

      contact: new FormGroup({
        id: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        latitude: new FormControl(null, Validators.required),
        longitude: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
      }),
    });
  }
}
