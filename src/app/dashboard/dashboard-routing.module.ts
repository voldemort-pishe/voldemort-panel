import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardCoordinatorComponent } from './dashboard-coordinator/dashboard-coordinator.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardCoordinatorComponent,
    data: { title: 'تازه‌ها' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
