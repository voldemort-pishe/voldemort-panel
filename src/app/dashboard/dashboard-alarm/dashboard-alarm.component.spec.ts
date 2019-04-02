import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAlarmComponent } from './dashboard-alarm.component';

describe('DashboardAlarmComponent', () => {
  let component: DashboardAlarmComponent;
  let fixture: ComponentFixture<DashboardAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
