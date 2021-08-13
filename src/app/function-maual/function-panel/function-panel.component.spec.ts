import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FunctionPanelComponent } from './function-panel.component';

describe('FunctionPanelComponent', () => {
  let component: FunctionPanelComponent;
  let fixture: ComponentFixture<FunctionPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
