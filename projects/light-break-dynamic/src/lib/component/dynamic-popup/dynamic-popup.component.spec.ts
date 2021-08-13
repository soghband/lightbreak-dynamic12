import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicPopupComponent } from './dynamic-popup.component';

describe('DynamicPopupComponent', () => {
  let component: DynamicPopupComponent;
  let fixture: ComponentFixture<DynamicPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
