import { OrderEvent } from "./OrderEvent"
import { OrderId } from "../valueobjects/OrderId"

export class OrderCancelledEvent extends OrderEvent {
  public readonly name = "OrderCancelledEvent"

  constructor(orderId: OrderId) {
    super(orderId)
  }
}