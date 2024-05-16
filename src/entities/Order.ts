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

export class Order {
  private readonly customerId: CustomerId
  private readonly restaurantId: RestaurantId
  private readonly deliveryAddress: StreetAddress
  private price: Money
  private readonly items: OrderItem[]
  private status: OrderStatus
  private readonly id: OrderId

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
    this.id = id || new OrderId()
  }

  initialize() {
    if (this.status !== OrderStatus.UNINITIALIZED) {
      throw new IllegalOrderStateError("Order is already initialized")
    }
    this.status = OrderStatus.PENDING
    console.log(`Order '${this.id}' initialized`)
  }

  approve() {
    if (this.status !== OrderStatus.PENDING) {
      throw new IllegalOrderStateError("Order is not pending")
    }
    this.status = OrderStatus.APPROVED
    console.log(`Order '${this.id}' approved`)
  }

  pay() {
    if (this.status !== OrderStatus.APPROVED) {
      throw new IllegalOrderStateError("Order is not approved")
    }
    this.status = OrderStatus.PAID
    console.log(`Order '${this.id}' paid`)
  }

  cancel() {
    if (this.status === OrderStatus.UNINITIALIZED) {
      throw new IllegalOrderStateError("Order is not initialized")
    }
    this.status = OrderStatus.CANCELLED
    console.log(`Order '${this.id}' cancelled`)
  }
}
