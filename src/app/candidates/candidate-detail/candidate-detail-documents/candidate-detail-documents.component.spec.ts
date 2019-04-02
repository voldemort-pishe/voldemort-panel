import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailDocumentsComponent } from './candidate-detail-documents.component';

describe('CandidateDetailDocumentsComponent', () => {
  let component: CandidateDetailDocumentsComponent;
  let fixture: ComponentFixture<CandidateDetailDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDetailDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
