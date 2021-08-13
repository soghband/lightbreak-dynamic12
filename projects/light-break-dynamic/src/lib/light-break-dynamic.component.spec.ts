import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LightBreakDynamicComponent } from './light-break-dynamic.component';

describe('LightBreakDynamicComponent', () => {
  let component: LightBreakDynamicComponent;
  let fixture: ComponentFixture<LightBreakDynamicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LightBreakDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightBreakDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
