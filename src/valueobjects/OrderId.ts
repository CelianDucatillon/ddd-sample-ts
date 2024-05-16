import { UUID } from "../types"

export class OrderId {
  constructor(private value: UUID) {}

  toString(): string {
    return this.value
  }
}
