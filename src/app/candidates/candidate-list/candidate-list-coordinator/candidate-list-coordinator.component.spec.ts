import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListCoordinatorComponent } from './candidate-list-coordinator.component';

describe('CandidateListCoordinatorComponent', () => {
  let component: CandidateListCoordinatorComponent;
  let fixture: ComponentFixture<CandidateListCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateListCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
