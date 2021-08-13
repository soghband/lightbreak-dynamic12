import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FunctionSpecificationComponent } from './function-specification.component';

describe('FunctionSpecificationComponent', () => {
  let component: FunctionSpecificationComponent;
  let fixture: ComponentFixture<FunctionSpecificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
