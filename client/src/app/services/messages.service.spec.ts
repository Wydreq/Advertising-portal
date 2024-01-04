import { TestBed } from '@angular/core/testing';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let messagesService: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagesService],
    });

    messagesService = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(messagesService).toBeTruthy();
  });

  it('should set and clear messages', () => {
    const severity = 'success';
    const summary = 'Test Summary';
    const detail = 'Test Detail';
    messagesService.setMessage(severity, summary, detail);

    messagesService.messages$.subscribe((messages) => {
      expect(messages.length).toBe(1);
      expect(messages[0].severity).toBe(severity);
      expect(messages[0].summary).toBe(summary);
      expect(messages[0].detail).toBe(detail);
    });
    setTimeout(() => {
      messagesService.messages$.subscribe((messages) => {
        expect(messages.length).toBe(0);
      });
    }, 4000);
  });
});
