import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestDynamicComponent } from './test-dynamic.component';

describe('TestDynamicComponent', () => {
  let component: TestDynamicComponent;
  let fixture: ComponentFixture<TestDynamicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
