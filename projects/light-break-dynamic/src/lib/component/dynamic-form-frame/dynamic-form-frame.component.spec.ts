import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormFrameComponent } from './dynamic-form-frame.component';

describe('DynamicFormFrameComponent', () => {
  let component: DynamicFormFrameComponent;
  let fixture: ComponentFixture<DynamicFormFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
