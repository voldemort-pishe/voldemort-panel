import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmailComponent } from './dashboard-email.component';

describe('DashboardEmailComponent', () => {
  let component: DashboardEmailComponent;
  let fixture: ComponentFixture<DashboardEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
