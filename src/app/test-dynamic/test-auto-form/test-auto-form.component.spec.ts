import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAutoFormComponent } from './test-auto-form.component';

describe('TestAutoFormComponent', () => {
  let component: TestAutoFormComponent;
  let fixture: ComponentFixture<TestAutoFormComponent>;

  beforeEach(async(() => {
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
