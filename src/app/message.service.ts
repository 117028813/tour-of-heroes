import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages = [];

  add(message) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  constructor() { }

}
