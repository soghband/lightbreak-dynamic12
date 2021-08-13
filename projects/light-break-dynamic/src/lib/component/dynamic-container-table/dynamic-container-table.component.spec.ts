import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicContainerTableComponent } from './dynamic-container-table.component';

describe('DynamicContainerTableComponent', () => {
  let component: DynamicContainerTableComponent;
  let fixture: ComponentFixture<DynamicContainerTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicContainerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicContainerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
