import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCoordinatorComponent } from './dashboard-coordinator.component';

describe('DashboardCoordinatorComponent', () => {
  let component: DashboardCoordinatorComponent;
  let fixture: ComponentFixture<DashboardCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
