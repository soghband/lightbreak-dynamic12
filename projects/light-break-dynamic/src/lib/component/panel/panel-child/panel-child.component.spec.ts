import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelChildComponent } from './panel-child.component';

describe('PanelChildComponent', () => {
  let component: PanelChildComponent;
  let fixture: ComponentFixture<PanelChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
