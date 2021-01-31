// Main event bus interface
export interface IEventBus {
  subscribe(subscription: string, handler: any): void;
  unsubscribe(subscription: string, handler: any): void;
  emit(event: string, ...args: string[]): void;
}

export default class EventBus {
  readonly listeners: {
    [key: string]: string[];
  };

  constructor() {
    this.listeners = {};
  }

  subscribe(subscription: string, handler: any): void {
    if (!this.listeners[subscription]) {
      this.listeners[subscription] = [];
    }

    this.listeners[subscription].push(handler);
  }

  unsubscribe(subscription: string, handler: any): void {
    if (!this.listeners[subscription]) {
      throw new Error(`Нет события: ${subscription}`);
    }

    this.listeners[subscription] = this.listeners[subscription].filter(listener => listener !== handler);
  }

  emit(event: string, ...args: string[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function(listener: any) {
      listener(...args);
    });
  }
}
