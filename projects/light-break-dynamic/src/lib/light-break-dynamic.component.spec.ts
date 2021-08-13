import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightBreakDynamicComponent } from './light-break-dynamic.component';

describe('LightBreakDynamicComponent', () => {
  let component: LightBreakDynamicComponent;
  let fixture: ComponentFixture<LightBreakDynamicComponent>;

  beforeEach(async(() => {
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
