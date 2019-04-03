import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitFeedbackDialogComponent } from './submit-feedback-dialog.component';

describe('SubmitFeedbackDialogComponent', () => {
  let component: SubmitFeedbackDialogComponent;
  let fixture: ComponentFixture<SubmitFeedbackDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitFeedbackDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
