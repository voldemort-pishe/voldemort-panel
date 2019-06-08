import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';

const routes: Routes = [
  {
    path: '',
    component: PlanComponent,
    data: { title: 'پلن' }
  },
  {
    path: 'invoice/:invoiceId',
    component: InvoicePreviewComponent,
    data: { title: 'فاکتور' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
