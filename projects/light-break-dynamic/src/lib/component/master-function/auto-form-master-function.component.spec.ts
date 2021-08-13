import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormMasterFunctionComponent } from './auto-form-master-function.component';

describe('AutoFormMasterFunctionComponent', () => {
  let component: AutoFormMasterFunctionComponent;
  let fixture: ComponentFixture<AutoFormMasterFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFormMasterFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFormMasterFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
