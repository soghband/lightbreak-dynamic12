import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColorSelectComponent } from './color-select.component';

describe('ColorSelectComponent', () => {
  let component: ColorSelectComponent;
  let fixture: ComponentFixture<ColorSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
