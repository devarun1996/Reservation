import { TestBed } from '@angular/core/testing';

import { ReservationCallService } from './reservation-call.service';

describe('ReservationCallService', () => {
  let service: ReservationCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
