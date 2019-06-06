import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { MainComponent } from './main/main.component';
import { PlanComponent } from './plan/plan.component';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    CoreRoutingModule,
  ],
  declarations: [
    MainComponent,
    PlanComponent,
    InvoicePreviewComponent,
    NotFoundComponent
  ],
  providers: [
  ],
})
export class CoreModule { }
