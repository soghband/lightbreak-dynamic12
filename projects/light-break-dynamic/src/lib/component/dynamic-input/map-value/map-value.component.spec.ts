import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapValueComponent } from './map-value.component';

describe('MapValueComponent', () => {
  let component: MapValueComponent;
  let fixture: ComponentFixture<MapValueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
