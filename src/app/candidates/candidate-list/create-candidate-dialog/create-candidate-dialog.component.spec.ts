import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCandidateDialogComponent } from './create-candidate-dialog.component';

describe('CreateCandidateDialogComponent', () => {
  let component: CreateCandidateDialogComponent;
  let fixture: ComponentFixture<CreateCandidateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCandidateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCandidateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
