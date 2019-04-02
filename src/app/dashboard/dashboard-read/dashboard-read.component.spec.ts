import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReadComponent } from './dashboard-read.component';

describe('DashboardReadComponent', () => {
  let component: DashboardReadComponent;
  let fixture: ComponentFixture<DashboardReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
