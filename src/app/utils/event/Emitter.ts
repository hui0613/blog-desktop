import { LinkedList } from './LinkedList'

enum ListenerType {
  Async = 1,
  Promise = 2
}

class Listener<T> {
  constructor(
    readonly callback: (e: T) => Promise<any> | any,
    readonly callbackThis: any | undefined,
    readonly type: ListenerType
  ) { }

  invoke(e: T) {
    return this.callback.call(this.callbackThis, e)
  }
}

export interface EventHook<T> {
  tapPromise: (listener: (e: T) => Promise<any>, thisArgs?: any) => any
  tapAsync: (listener: (e: T) => any, thisArgs?: any) => any
}

export class Emitter<T> {
  protected _listeners?: LinkedList<Listener<T>>
  private _event?: EventHook<T>
  private _deliveryQueue?: PrivateEventDeliveryQueue

  get event(): EventHook<T> {
    if (!this._event) {
      this._event = {
        tapAsync: (callback: (e: T) => any, thisArgs?: any) => {
          if (!this._listeners) {
            this._listeners = new LinkedList()
          }

          const listener = new Listener(callback, thisArgs, ListenerType.Async)

          this._listeners.push(listener)
        },
        tapPromise: (callback: (e: T) => Promise<any>, thisArgs?: any) => {
          if (!this._listeners) {
            this._listeners = new LinkedList()
          }

          const listener = new Listener(callback, thisArgs, ListenerType.Promise)

          this._listeners.push(listener)
        }
      }
    }
    return this._event
  }

  fire(event: T, result: (e: any) => void, done: () => void): void {
    if (!this._listeners) {
      return
    }
    if (!this._deliveryQueue) {
      this._deliveryQueue = new PrivateEventDeliveryQueue()
    }

    for (const listener of this._listeners) {
      this._deliveryQueue.push(this, listener, event)
    }

    this._deliveryQueue.deliver(result, done)
  }
}

class EventDeliveryQueueElement<T = any> {
  constructor(readonly emitter: Emitter<T>, readonly listener: Listener<T>, readonly event: T) { }
}

export class EventDeliveryQueue {
  protected _queue = new LinkedList<EventDeliveryQueueElement>()

  get size(): number {
    return this._queue.size
  }

  push<T>(emitter: Emitter<T>, listener: Listener<T>, event: T): void {
    this._queue.push(new EventDeliveryQueueElement(emitter, listener, event))
  }

  clear<T>(emitter: Emitter<T>): void {
    const newQueue = new LinkedList<EventDeliveryQueueElement>()
    for (const element of this._queue) {
      if (element.emitter !== emitter) {
        newQueue.push(element)
      }
    }
    this._queue = newQueue
  }

  deliver(result: (e: any) => void, done: () => void): void {
    const _execDone = this.judgeAllDone(this._queue.size, done)
    while (this._queue.size > 0) {
      const element = this._queue.shift()!
      try {
        if (element.listener.type === ListenerType.Async) {
          const res = element.listener.invoke(element.event)
          result(res)
          _execDone()
        } else if (element.listener.type === ListenerType.Promise) {
          element.listener.invoke(element.event).then((res: any) => {
            result(res)
            _execDone()
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  private judgeAllDone(listenerSize: number, done: () => void) {
    return () => {
      --listenerSize
      if (!listenerSize) {
        done()
      }
    }
  }
}

class PrivateEventDeliveryQueue extends EventDeliveryQueue {
  override clear<T>(emitter: Emitter<T>): void {
    // Here we can just clear the entire linked list because
    // all elements are guaranteed to belong to this emitter
    this._queue.clear()
  }
}
