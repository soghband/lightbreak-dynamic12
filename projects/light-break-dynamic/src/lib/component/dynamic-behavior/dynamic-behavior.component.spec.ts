import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicBehaviorComponent } from './dynamic-behavior.component';

describe('DynamicBehaviorComponent', () => {
  let component: DynamicBehaviorComponent;
  let fixture: ComponentFixture<DynamicBehaviorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicBehaviorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
