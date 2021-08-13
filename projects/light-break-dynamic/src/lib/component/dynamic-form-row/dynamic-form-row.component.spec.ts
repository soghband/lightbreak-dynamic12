import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormRowComponent } from './dynamic-form-row.component';

describe('DynamicFormRowComponent', () => {
  let component: DynamicFormRowComponent;
  let fixture: ComponentFixture<DynamicFormRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
