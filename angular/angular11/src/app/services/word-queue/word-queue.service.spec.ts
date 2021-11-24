import { TestBed } from '@angular/core/testing';

import { WordQueueService } from './word-queue.service';

describe('WordQueueService', () => {
  let service: WordQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
