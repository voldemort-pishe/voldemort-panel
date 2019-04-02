import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListAllComponent } from './candidate-list-all.component';

describe('CandidateListAllComponent', () => {
  let component: CandidateListAllComponent;
  let fixture: ComponentFixture<CandidateListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
