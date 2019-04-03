import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitScheduleDialogComponent } from './submit-schedule-dialog.component';

describe('SubmitScheduleDialogComponent', () => {
  let component: SubmitScheduleDialogComponent;
  let fixture: ComponentFixture<SubmitScheduleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitScheduleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
