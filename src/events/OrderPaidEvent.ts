import { OrderEvent } from "./OrderEvent"
import { OrderId } from "../valueobjects/OrderId"

export class OrderPaidEvent extends OrderEvent {
  public readonly name = "OrderPaidEvent"

  constructor(orderId: OrderId) {
    super(orderId)
  }
}