import { UUID } from "../types"

export class CustomerId {
  constructor(private value: UUID) {}

  toString(): string {
    return this.value
  }
}
