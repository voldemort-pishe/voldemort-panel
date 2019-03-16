import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RiyalCurrencyPipe } from './pipe/riyal-currency.pipe';
import { PersianNumberPipePipe } from './pipe/persian-number.pipe';
import { JalaliPipe } from './pipe/jalali.pipe';
import { MaterialModule } from '@app/material/material.module';
import { CandidateTableComponent } from './components/candidate-table/candidate-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
  ],
  declarations: [
    RiyalCurrencyPipe,
    PersianNumberPipePipe,
    JalaliPipe,
    CandidateTableComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    TranslateModule,

    RiyalCurrencyPipe,
    PersianNumberPipePipe,
    JalaliPipe,
    CandidateTableComponent,
  ]
})
export class SharedModule { }
