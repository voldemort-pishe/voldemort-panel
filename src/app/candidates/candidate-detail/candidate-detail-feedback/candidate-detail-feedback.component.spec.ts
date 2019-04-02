import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailFeedbackComponent } from './candidate-detail-feedback.component';

describe('CandidateDetailFeedbackComponent', () => {
  let component: CandidateDetailFeedbackComponent;
  let fixture: ComponentFixture<CandidateDetailFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDetailFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
