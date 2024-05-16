export class ProductNotFoundInRestaurantError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = "ProductNotFoundInRestaurantError"
  }
}