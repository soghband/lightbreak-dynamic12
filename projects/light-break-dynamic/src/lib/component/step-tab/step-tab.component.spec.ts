import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepTabComponent } from './step-tab.component';

describe('StepTabComponent', () => {
  let component: StepTabComponent;
  let fixture: ComponentFixture<StepTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StepTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
