import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailHeaderComponent } from './candidate-detail-header.component';

describe('CandidateDetailHeaderComponent', () => {
  let component: CandidateDetailHeaderComponent;
  let fixture: ComponentFixture<CandidateDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDetailHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
