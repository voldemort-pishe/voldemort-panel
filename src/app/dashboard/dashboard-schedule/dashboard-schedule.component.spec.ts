import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardScheduleComponent } from './dashboard-schedule.component';

describe('DashboardScheduleComponent', () => {
  let component: DashboardScheduleComponent;
  let fixture: ComponentFixture<DashboardScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
