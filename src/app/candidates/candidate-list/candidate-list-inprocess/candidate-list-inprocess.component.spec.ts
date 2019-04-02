import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListInprocessComponent } from './candidate-list-inprocess.component';

describe('CandidateListInprocessComponent', () => {
  let component: CandidateListInprocessComponent;
  let fixture: ComponentFixture<CandidateListInprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateListInprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListInprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
