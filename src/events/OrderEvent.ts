import { OrderId } from "../valueobjects/OrderId"

export abstract class OrderEvent {
  protected readonly _createdAt: Date

  protected constructor(
    protected _orderId: OrderId,
  ) {
    this._createdAt = new Date()
  }

  get orderId(): OrderId {
    return this._orderId
  }

  get createdAt(): Date {
    return this._createdAt
  }
}