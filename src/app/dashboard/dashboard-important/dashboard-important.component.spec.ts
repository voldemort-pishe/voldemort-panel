import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardImportantComponent } from './dashboard-important.component';

describe('DashboardImportantComponent', () => {
  let component: DashboardImportantComponent;
  let fixture: ComponentFixture<DashboardImportantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardImportantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardImportantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
