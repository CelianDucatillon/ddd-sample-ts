import { RestaurantId } from "../valueobjects/RestaurantId"
import { Product } from "./Product"

export class Restaurant {
  private readonly _id: RestaurantId
  private readonly _products: Product[]

  constructor(
    products: Product[] = [],
    id?: RestaurantId,
  ) {
    this._id = id || new RestaurantId()
    this._products = products
  }

  get id(): RestaurantId {
    return this._id
  }

  get products(): Product[] {
    return this._products
  }

  findProductByName(productName: string): Product | undefined {
    return this._products.find((product) => product.name === productName)
  }
}
