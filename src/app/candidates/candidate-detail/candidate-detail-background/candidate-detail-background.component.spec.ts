import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailBackgroundComponent } from './candidate-detail-background.component';

describe('CandidateDetailBackgroundComponent', () => {
  let component: CandidateDetailBackgroundComponent;
  let fixture: ComponentFixture<CandidateDetailBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDetailBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
