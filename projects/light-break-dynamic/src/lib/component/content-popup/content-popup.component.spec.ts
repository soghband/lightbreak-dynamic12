import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContentPopupComponent } from './content-popup.component';

describe('ContentPopupComponent', () => {
  let component: ContentPopupComponent;
  let fixture: ComponentFixture<ContentPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
