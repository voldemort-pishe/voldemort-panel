import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListRejectedComponent } from './candidate-list-rejected.component';

describe('CandidateListRejectedComponent', () => {
  let component: CandidateListRejectedComponent;
  let fixture: ComponentFixture<CandidateListRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateListRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
