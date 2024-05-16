import { OrderId } from "../valueobjects/OrderId"
import { OrderStatus } from "../valueobjects/OrderStatus"
import { StreetAddress } from "../valueobjects/StreetAddress"
import { Customer } from "./Customer"
import { Restaurant } from "./Restaurant"
import { OrderItem } from "./OrderItem"
import { Money } from "../valueobjects/Money"
import { RestaurantId } from "../valueobjects/RestaurantId"
import { CustomerId } from "../valueobjects/CustomerId"

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
}
