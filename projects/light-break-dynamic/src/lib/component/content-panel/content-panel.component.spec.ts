import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContentPanelComponent } from './content-panel.component';

describe('ContentPanelComponent', () => {
  let component: ContentPanelComponent;
  let fixture: ComponentFixture<ContentPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
