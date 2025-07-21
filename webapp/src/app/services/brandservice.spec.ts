import { TestBed } from '@angular/core/testing';

import { Brandservice } from './brandservice';

describe('Brandservice', () => {
  let service: Brandservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Brandservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
