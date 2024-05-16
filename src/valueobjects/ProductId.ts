import { UUID } from "../types"

export class ProductId {
  constructor(private value: UUID) {}

  toString(): string {
    return this.value
  }
}
