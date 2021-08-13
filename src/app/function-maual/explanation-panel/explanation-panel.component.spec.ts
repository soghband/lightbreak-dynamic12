import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExplanationPanelComponent } from './explanation-panel.component';

describe('ExplanationPanelComponent', () => {
  let component: ExplanationPanelComponent;
  let fixture: ComponentFixture<ExplanationPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplanationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplanationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
