import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P2PanelComponent } from './p2-panel.component';

describe('P2PanelComponent', () => {
  let component: P2PanelComponent;
  let fixture: ComponentFixture<P2PanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P2PanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P2PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
