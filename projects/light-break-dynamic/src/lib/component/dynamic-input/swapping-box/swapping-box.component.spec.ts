import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwappingBoxComponent } from './swapping-box.component';

describe('SwappingBoxComponent', () => {
  let component: SwappingBoxComponent;
  let fixture: ComponentFixture<SwappingBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwappingBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwappingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
