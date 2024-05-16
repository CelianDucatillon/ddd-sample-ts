import { OrderEvent } from "./OrderEvent"
import { OrderId } from "../valueobjects/OrderId"

export class OrderInitializedEvent extends OrderEvent {
  public readonly name = "OrderInitializedEvent"

  constructor(orderId: OrderId) {
    super(orderId)
  }
}