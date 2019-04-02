import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailCoordinatorComponent } from './candidate-detail-coordinator.component';

describe('CandidateDetailCoordinatorComponent', () => {
  let component: CandidateDetailCoordinatorComponent;
  let fixture: ComponentFixture<CandidateDetailCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDetailCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
