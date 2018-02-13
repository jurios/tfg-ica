import { TestBed, inject } from '@angular/core/testing';

import { SegmentService } from './segment.service';

describe('SegmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegmentService]
    });
  });

  it('should ...', inject([SegmentService], (service: SegmentService) => {
    expect(service).toBeTruthy();
  }));
});
