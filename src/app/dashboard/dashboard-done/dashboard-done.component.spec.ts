import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDoneComponent } from './dashboard-done.component';

describe('DashboardDoneComponent', () => {
  let component: DashboardDoneComponent;
  let fixture: ComponentFixture<DashboardDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
