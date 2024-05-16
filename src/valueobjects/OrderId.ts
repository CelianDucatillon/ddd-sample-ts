import { UUID } from "../types"
import { v4 as uuid } from "uuid"

export class OrderId {
  private readonly value: UUID

  constructor(value?: string) {
    this.value = value || uuid()
  }

  equals(other: OrderId): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
