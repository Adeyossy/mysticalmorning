import { TestBed } from '@angular/core/testing';

import { FirebaserviceService } from './firebaservice.service';

describe('FirebaserviceService', () => {
  let service: FirebaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
