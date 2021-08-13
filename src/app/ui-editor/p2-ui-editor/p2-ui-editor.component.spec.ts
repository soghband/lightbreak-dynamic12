import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P2UiEditorComponent } from './p2-ui-editor.component';

describe('P2UiEditorComponent', () => {
  let component: P2UiEditorComponent;
  let fixture: ComponentFixture<P2UiEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P2UiEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P2UiEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
