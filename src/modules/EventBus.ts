type Callback = (...args: any[]) => void;
type Listeners = Record<string, Callback[]>;

export default class EventBus {
  readonly listeners: Listeners;

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

    this.listeners[subscription] = this.listeners[subscription].filter(
      (listener) => listener !== handler,
    );
  }

  emit(event: string, ...args: string[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener: any) => {
      listener(...args);
    });
  }
}
