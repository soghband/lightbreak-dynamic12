import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverAllExampleComponent } from './over-all-example.component';

describe('OverAllExampleComponent', () => {
  let component: OverAllExampleComponent;
  let fixture: ComponentFixture<OverAllExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverAllExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverAllExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
