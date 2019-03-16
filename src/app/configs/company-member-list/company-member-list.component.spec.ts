import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMemberListComponent } from './company-member-list.component';

describe('CompanyMemberListComponent', () => {
  let component: CompanyMemberListComponent;
  let fixture: ComponentFixture<CompanyMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
