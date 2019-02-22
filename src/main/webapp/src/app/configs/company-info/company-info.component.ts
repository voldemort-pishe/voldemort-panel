import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from '@app/core';

@Component({
  selector: 'anms-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  form: FormGroup;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.generateForm();
  }

  private fetch(): void {

  }

  private fillFormFromModel(): void {
    if (!this.form) return;

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
