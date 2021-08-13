import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestAutoFormComponent } from './test-auto-form.component';

describe('TestAutoFormComponent', () => {
  let component: TestAutoFormComponent;
  let fixture: ComponentFixture<TestAutoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAutoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
