class EventEmitter {
    constructor() {
      this.events = {};
    }
  
    subscribe(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
      return () => this.events[eventName] = this.events[eventName].filter(eventFn => eventFn !== callback);
    }
  
    emit(eventName, data) {
      const event = this.events[eventName];
      if (event) {
        event.forEach(fn => {
          fn.call(null, data);
        });
      }
    }
  }
  
  // Export an instance of EventEmitter
  export const eventEmitter = new EventEmitter();