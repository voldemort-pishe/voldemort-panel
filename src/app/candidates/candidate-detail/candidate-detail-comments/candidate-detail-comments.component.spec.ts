import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailCommentsComponent } from './candidate-detail-comments.component';

describe('CandidateDetailCommentsComponent', () => {
  let component: CandidateDetailCommentsComponent;
  let fixture: ComponentFixture<CandidateDetailCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDetailCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
