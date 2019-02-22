import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigsRoutingModule } from './configs-routing.module';
import { ConfigsComponent } from './configs/configs.component';
import { UsersComponent } from './users/users.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [ConfigsComponent, UsersComponent, CompanyInfoComponent, TransactionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConfigsRoutingModule,
  ]
})
export class ConfigsModule { }
