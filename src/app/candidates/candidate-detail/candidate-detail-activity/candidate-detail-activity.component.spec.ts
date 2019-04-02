import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailActivityComponent } from './candidate-detail-activity.component';

describe('CandidateDetailActivityComponent', () => {
  let component: CandidateDetailActivityComponent;
  let fixture: ComponentFixture<CandidateDetailActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDetailActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
