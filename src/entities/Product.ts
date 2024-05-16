import { ProductId } from "../valueobjects/ProductId"
import { Money } from "../valueobjects/Money"

export class Product {
  private readonly id: ProductId

  constructor(
    private _name: string,
    private _price: Money,
    id?: ProductId,
  ) {
    this.id = id || new ProductId()
  }

  get name(): string {
    return this._name
  }

  get price(): Money {
    return this._price
  }
}
