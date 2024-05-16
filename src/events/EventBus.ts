export class EventBus {
  private subscribers: { [key: string]: Function[] } = {}

  public subscribe(event: string, callback: Function) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = []
    }
    this.subscribers[event].push(callback)
  }

  public publish(event: string, data?: any) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => callback(data))
    }
  }
}
