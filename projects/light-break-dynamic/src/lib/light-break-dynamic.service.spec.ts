import { TestBed } from '@angular/core/testing';

import { LightBreakDynamicService } from './light-break-dynamic.service';

describe('LightBreakDynamicService', () => {
  let service: LightBreakDynamicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightBreakDynamicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
