import { OrderEvent } from "./OrderEvent"
import { OrderId } from "../valueobjects/OrderId"

export class OrderApprovedEvent extends OrderEvent {
  public readonly name = "OrderApprovedEvent"

  constructor(orderId: OrderId) {
    super(orderId)
  }
}