import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'anms-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {

  menuItems: { title: string; url: string; }[] = [
    {
      title: 'اطلاعات شرکت',
      url: 'company-info',
    },
    {
      title: 'مدیریت اعضا',
      url: 'company-members',
    },
    {
      title: 'تراکنش‌های مالی',
      url: 'transactions',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
