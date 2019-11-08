import { TestBed } from '@angular/core/testing';

import { SetupsService } from './setups.service';

describe('SetupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetupsService = TestBed.get(SetupsService);
    expect(service).toBeTruthy();
  });
});
