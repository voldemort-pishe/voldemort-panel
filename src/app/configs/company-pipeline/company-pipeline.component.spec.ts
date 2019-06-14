import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPipelineComponent } from './company-pipeline.component';

describe('CompanyPipelineComponent', () => {
  let component: CompanyPipelineComponent;
  let fixture: ComponentFixture<CompanyPipelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPipelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
