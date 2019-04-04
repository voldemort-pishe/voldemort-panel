import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMemberSelectComponent } from './company-member-select.component';

describe('CompanyMemberSelectComponent', () => {
  let component: CompanyMemberSelectComponent;
  let fixture: ComponentFixture<CompanyMemberSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMemberSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMemberSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
