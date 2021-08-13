import { TestBed } from '@angular/core/testing';

import { FormHttpRequestService } from './form-http-request.service';

describe('FormHttpRequestService', () => {
  let service: FormHttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormHttpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
