import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailScheduleComponent } from './candidate-detail-schedule.component';

describe('CandidateDetailScheduleComponent', () => {
  let component: CandidateDetailScheduleComponent;
  let fixture: ComponentFixture<CandidateDetailScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDetailScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
