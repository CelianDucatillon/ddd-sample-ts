import { OrderId } from "../valueobjects/OrderId"
import { OrderStatus } from "../valueobjects/OrderStatus"
import { StreetAddress } from "../valueobjects/StreetAddress"
import { Customer } from "./Customer"
import { Restaurant } from "./Restaurant"
import { OrderItem } from "./OrderItem"
import { Money } from "../valueobjects/Money"
import { RestaurantId } from "../valueobjects/RestaurantId"
import { CustomerId } from "../valueobjects/CustomerId"
import { IllegalOrderStateError } from "../errors/IllegalOrderStateError"
import { EventBus } from "../events/EventBus"
import { OrderInitializedEvent } from "../events/OrderInitializedEvent"
import { OrderApprovedEvent } from "../events/OrderApprovedEvent"
import { OrderPaidEvent } from "../events/OrderPaidEvent"
import { OrderCancelledEvent } from "../events/OrderCancelledEvent"

export class Order {
  private readonly customerId: CustomerId
  private readonly restaurantId: RestaurantId
  private readonly deliveryAddress: StreetAddress
  private price: Money
  private readonly items: OrderItem[]
  private status: OrderStatus
  private readonly _id: OrderId
  private eventBus?: EventBus

  constructor(
    customer: Customer,
    restaurant: Restaurant,
    deliveryAddress: StreetAddress,
    items?: OrderItem[],
    id?: OrderId,
  ) {
    this.customerId = customer.id
    this.restaurantId = restaurant.id
    this.deliveryAddress = deliveryAddress
    this.items = items || []
    this.price = this.items.reduce(
      (total, item) => total.add(item.subtotal),
      new Money(0, this.items[0].subtotal.currency),
    )
    this.status = OrderStatus.UNINITIALIZED
    this._id = id || new OrderId()
  }

  get id(): OrderId {
    return this._id
  }

  setEventBus(eventBus: EventBus) {
    this.eventBus = eventBus
  }

  initialize() {
    if (this.status !== OrderStatus.UNINITIALIZED) {
      throw new IllegalOrderStateError("Order is already initialized")
    }
    this.status = OrderStatus.PENDING
    if (this.eventBus) {
      this.eventBus.publish("OrderEvents", new OrderInitializedEvent(this._id))
    }
  }

  approve() {
    if (this.status !== OrderStatus.PENDING) {
      throw new IllegalOrderStateError("Order is not pending")
    }
    this.status = OrderStatus.APPROVED
    if (this.eventBus) {
      this.eventBus.publish("OrderEvents", new OrderApprovedEvent(this._id))
    }
  }

  pay() {
    if (this.status !== OrderStatus.APPROVED) {
      throw new IllegalOrderStateError("Order is not approved")
    }
    this.status = OrderStatus.PAID
    if (this.eventBus) {
      this.eventBus.publish("OrderEvents", new OrderPaidEvent(this._id))
    }
  }

  cancel() {
    if (this.status === OrderStatus.UNINITIALIZED) {
      throw new IllegalOrderStateError("Order is not initialized")
    }
    if (this.status === OrderStatus.PAID) {
      throw new IllegalOrderStateError("Order is already paid")
    }
    this.status = OrderStatus.CANCELLED
    if (this.eventBus) {
      this.eventBus.publish("OrderEvents", new OrderCancelledEvent(this._id))
    }
  }
}
