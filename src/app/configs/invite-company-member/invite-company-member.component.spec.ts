import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCompanyMemberComponent } from './invite-company-member.component';

describe('InviteCompanyMemberComponent', () => {
  let component: InviteCompanyMemberComponent;
  let fixture: ComponentFixture<InviteCompanyMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteCompanyMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteCompanyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
