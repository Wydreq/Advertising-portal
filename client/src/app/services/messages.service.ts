import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(
    []
  );
  messages$ = this.messagesSubject.asObservable();

  setMessage(severity: string, summary: string, detail: string) {
    const message = [
      {
        severity: severity,
        summary: summary,
        detail: detail,
      },
    ];

    this.messagesSubject.next(message);

    setTimeout(() => {
      this.messagesSubject.next([]);
    }, 4000);
  }
}
