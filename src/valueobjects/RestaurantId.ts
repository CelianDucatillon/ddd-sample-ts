import { UUID } from "../types"

export class OrderItemId {
  constructor(private value: UUID) {}

  toString(): string {
    return this.value
  }
}
