import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormLabelPanelComponent } from './dynamic-form-label-panel.component';

describe('DynamicFormLabelPanelComponent', () => {
  let component: DynamicFormLabelPanelComponent;
  let fixture: ComponentFixture<DynamicFormLabelPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormLabelPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormLabelPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
