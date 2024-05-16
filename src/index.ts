import { v4 as uuid } from "uuid"
import { UUID } from "./types"

class MyClass {
  id: UUID

  constructor() {
    this.id = uuid()
  }
}

function hello(): UUID {
  return uuid()
}

console.log(hello())
