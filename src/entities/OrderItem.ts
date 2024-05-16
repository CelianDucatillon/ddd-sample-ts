import { Money } from "../valueobjects/Money"
import { OrderId } from "../valueobjects/OrderId"
import { OrderItemId } from "../valueobjects/OrderItemId"
import { Product } from "./Product"
import { Order } from "./Order"

export class OrderItem {
  private readonly orderId: OrderId
  private readonly product: Product
  private readonly quantity: number
  private readonly price: Money
  private readonly _subtotal: Money
  private readonly id: OrderItemId

  constructor(
    orderId: OrderId,
    product: Product,
    quantity: number,
    id?: OrderItemId,
  ) {
    this.orderId = orderId
    this.product = product
    this.quantity = quantity
    this.price = product.price
    this._subtotal = product.price.multiply(quantity)
    this.id = id || new OrderItemId()
  }

  get subtotal(): Money {
    return this._subtotal
  }
}
