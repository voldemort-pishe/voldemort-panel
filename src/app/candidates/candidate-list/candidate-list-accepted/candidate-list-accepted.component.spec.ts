import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListAcceptedComponent } from './candidate-list-accepted.component';

describe('CandidateListAcceptedComponent', () => {
  let component: CandidateListAcceptedComponent;
  let fixture: ComponentFixture<CandidateListAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateListAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
