'use strict';

var LinkedList = require('./LinkedList.js');

class Listener {
  constructor(callback, callbackThis, type) {
    this.callback = callback;
    this.callbackThis = callbackThis;
    this.type = type;
  }
  invoke(e) {
    return this.callback.call(this.callbackThis, e);
  }
}
class Emitter {
  get event() {
    if (!this._event) {
      this._event = {
        tapAsync: (callback, thisArgs) => {
          if (!this._listeners) {
            this._listeners = new LinkedList.LinkedList();
          }
          const listener = new Listener(callback, thisArgs, 1 /* Async */);
          this._listeners.push(listener);
        },
        tapPromise: (callback, thisArgs) => {
          if (!this._listeners) {
            this._listeners = new LinkedList.LinkedList();
          }
          const listener = new Listener(callback, thisArgs, 2 /* Promise */);
          this._listeners.push(listener);
        }
      };
    }
    return this._event;
  }
  fire(event, result, done) {
    if (!this._listeners) {
      return;
    }
    if (!this._deliveryQueue) {
      this._deliveryQueue = new PrivateEventDeliveryQueue();
    }
    for (const listener of this._listeners) {
      this._deliveryQueue.push(this, listener, event);
    }
    this._deliveryQueue.deliver(result, done);
  }
}
class EventDeliveryQueueElement {
  constructor(emitter, listener, event) {
    this.emitter = emitter;
    this.listener = listener;
    this.event = event;
  }
}
class EventDeliveryQueue {
  constructor() {
    this._queue = new LinkedList.LinkedList();
  }
  get size() {
    return this._queue.size;
  }
  push(emitter, listener, event) {
    this._queue.push(new EventDeliveryQueueElement(emitter, listener, event));
  }
  clear(emitter) {
    const newQueue = new LinkedList.LinkedList();
    for (const element of this._queue) {
      if (element.emitter !== emitter) {
        newQueue.push(element);
      }
    }
    this._queue = newQueue;
  }
  deliver(result, done) {
    const _execDone = this.judgeAllDone(this._queue.size, done);
    while (this._queue.size > 0) {
      const element = this._queue.shift();
      try {
        if (element.listener.type === 1 /* Async */) {
          const res = element.listener.invoke(element.event);
          result(res);
          _execDone();
        } else if (element.listener.type === 2 /* Promise */) {
          element.listener.invoke(element.event).then((res) => {
            result(res);
            _execDone();
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  judgeAllDone(listenerSize, done) {
    return () => {
      --listenerSize;
      if (!listenerSize) {
        done();
      }
    };
  }
}
class PrivateEventDeliveryQueue extends EventDeliveryQueue {
  clear(emitter) {
    this._queue.clear();
  }
}

exports.Emitter = Emitter;
exports.EventDeliveryQueue = EventDeliveryQueue;
