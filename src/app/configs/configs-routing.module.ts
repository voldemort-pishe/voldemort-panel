import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigsComponent } from './configs/configs.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CompanyMemberListComponent } from './company-member-list/company-member-list.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CompanyPipelineComponent } from './company-pipeline/company-pipeline.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigsComponent,
    data: { title: 'تنظیمات' },
    children: [
      { path: '', redirectTo: 'company-info' },
      {
        path: 'company-info',
        component: CompanyInfoComponent,
        data: { title: 'اطلاعات شرکت' },
      },
      {
        path: 'company-members',
        component: CompanyMemberListComponent,
        data: { title: 'اعضای شرکت' },
      },
      {
        path: 'company-pipeline',
        component: CompanyPipelineComponent,
        data: { title: 'فرآیند استخدام' },
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: { title: 'تراکنش‌های مالی' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule { }
