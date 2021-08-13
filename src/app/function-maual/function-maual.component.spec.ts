import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionMaualComponent } from './function-maual.component';

describe('FunctionMaualComponent', () => {
  let component: FunctionMaualComponent;
  let fixture: ComponentFixture<FunctionMaualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionMaualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionMaualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
