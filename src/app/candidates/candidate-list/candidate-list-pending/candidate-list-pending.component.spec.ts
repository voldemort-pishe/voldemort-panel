import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListPendingComponent } from './candidate-list-pending.component';

describe('CandidateListPendingComponent', () => {
  let component: CandidateListPendingComponent;
  let fixture: ComponentFixture<CandidateListPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateListPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
