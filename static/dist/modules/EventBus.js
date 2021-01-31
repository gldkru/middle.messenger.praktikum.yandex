export default class EventBus {
    constructor() {
        this.listeners = {};
    }
    subscribe(subscription, handler) {
        if (!this.listeners[subscription]) {
            this.listeners[subscription] = [];
        }
        this.listeners[subscription].push(handler);
    }
    unsubscribe(subscription, handler) {
        if (!this.listeners[subscription]) {
            throw new Error(`Нет события: ${subscription}`);
        }
        this.listeners[subscription] = this.listeners[subscription].filter(listener => listener !== handler);
    }
    emit(event, ...args) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}
//# sourceMappingURL=EventBus.js.map