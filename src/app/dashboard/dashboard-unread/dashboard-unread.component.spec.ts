import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUnreadComponent } from './dashboard-unread.component';

describe('DashboardUnreadComponent', () => {
  let component: DashboardUnreadComponent;
  let fixture: ComponentFixture<DashboardUnreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUnreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUnreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
