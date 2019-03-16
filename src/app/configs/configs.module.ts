import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigsRoutingModule } from './configs-routing.module';
import { ConfigsComponent } from './configs/configs.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CompanyMemberListComponent } from './company-member-list/company-member-list.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    ConfigsComponent,
    CompanyInfoComponent,
    CompanyMemberListComponent,
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConfigsRoutingModule,
  ]
})
export class ConfigsModule { }
