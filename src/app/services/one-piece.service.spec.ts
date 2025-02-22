import { TestBed } from '@angular/core/testing';

import { OnePieceService } from './one-piece.service';

describe('OnePieceService', () => {
  let service: OnePieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnePieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
