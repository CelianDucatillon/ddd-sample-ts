import { UUID } from "../types"
import { v4 as uuid } from "uuid"

export class CustomerId {
  private readonly value: UUID

  constructor(value?: string) {
    this.value = value || uuid()
  }

  equals(other: CustomerId): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
