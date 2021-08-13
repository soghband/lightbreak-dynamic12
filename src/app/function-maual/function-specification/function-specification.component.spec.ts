import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionSpecificationComponent } from './function-specification.component';

describe('FunctionSpecificationComponent', () => {
  let component: FunctionSpecificationComponent;
  let fixture: ComponentFixture<FunctionSpecificationComponent>;

  beforeEach(async(() => {
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
