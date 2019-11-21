import { TestBed } from '@angular/core/testing';

import { ArrayHandlerService } from './array-handler.service';

describe('ArrayHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrayHandlerService = TestBed.get(ArrayHandlerService);
    expect(service).toBeTruthy();
  });
});
