import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicContainerComponent } from './dynamic-container.component';

describe('DynamicContainerComponent', () => {
  let component: DynamicContainerComponent;
  let fixture: ComponentFixture<DynamicContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
