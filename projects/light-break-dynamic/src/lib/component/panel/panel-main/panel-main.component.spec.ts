import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMainComponent } from './panel-main.component';

describe('PanelMainComponent', () => {
  let component: PanelMainComponent;
  let fixture: ComponentFixture<PanelMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
