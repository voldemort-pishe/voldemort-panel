import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobHiringTeamComponent } from './job-hiring-team.component';

describe('JobHiringTeamComponent', () => {
  let component: JobHiringTeamComponent;
  let fixture: ComponentFixture<JobHiringTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobHiringTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobHiringTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
