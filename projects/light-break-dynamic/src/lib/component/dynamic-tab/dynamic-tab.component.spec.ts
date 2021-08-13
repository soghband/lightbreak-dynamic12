import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicTabComponent } from './dynamic-tab.component';

describe('DynamicTabComponent', () => {
  let component: DynamicTabComponent;
  let fixture: ComponentFixture<DynamicTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
