import { CustomerId } from "../valueobjects/CustomerId"
import { Restaurant } from "./Restaurant"
import { Order } from "./Order"
import { StreetAddress } from "../valueobjects/StreetAddress"
import { OrderItem } from "./OrderItem"
import { OrderId } from "../valueobjects/OrderId"
import { ProductNotFoundInRestaurantError } from "../errors/ProductNotFoundInRestaurantError"

export class Customer {
  private readonly _id: CustomerId

  constructor(
    private firstName: string,
    private lastName: string,
    id?: CustomerId,
  ) {
    this._id = id || new CustomerId()
  }

  get id(): CustomerId {
    return this._id
  }

  order(
    restaurant: Restaurant,
    deliveryAddress: StreetAddress,
    orderItems: [string, number][],
  ): Order {
    const newOrderId = new OrderId()
    return new Order(
      this,
      restaurant,
      deliveryAddress,
      orderItems.map(([productName, quantity]) => {
        const product = restaurant.findProductByName(productName)
        if (!product) {
          throw new ProductNotFoundInRestaurantError(`Product "${productName}" not found in restaurant`)
        }
        return new OrderItem(newOrderId, product, quantity)
      }),
      newOrderId,
    )
  }
}
