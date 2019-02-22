import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigsComponent } from './configs/configs.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { UsersComponent } from './users/users.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigsComponent,
    data: { title: 'تنظیمات' },
    children: [
      { path: '', redirectTo: 'company-info' },
      { path: 'company-info', component: CompanyInfoComponent },
      { path: 'users', component: UsersComponent },
      { path: 'transactions', component: TransactionsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule { }
