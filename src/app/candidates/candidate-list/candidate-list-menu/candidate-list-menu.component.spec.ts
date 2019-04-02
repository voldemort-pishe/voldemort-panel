import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListMenuComponent } from './candidate-list-menu.component';

describe('CandidateListMenuComponent', () => {
  let component: CandidateListMenuComponent;
  let fixture: ComponentFixture<CandidateListMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateListMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
