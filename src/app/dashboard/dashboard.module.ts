import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardCoordinatorComponent } from './dashboard-coordinator/dashboard-coordinator.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    DashboardCoordinatorComponent,
    DashboardHeaderComponent,
    DashboardMenuComponent,
    DashboardEventsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
