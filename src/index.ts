import { Money } from "./valueobjects/Money"
import { Restaurant } from "./entities/Restaurant"
import { Product } from "./entities/Product"
import { Customer } from "./entities/Customer"
import { StreetAddress } from "./valueobjects/StreetAddress"
import { EventBus } from "./events/EventBus"
import { OrderEvent } from "./events/OrderEvent"

const eventBus = new EventBus()

eventBus.subscribe("OrderEvents", (data: OrderEvent) => {
  console.log(`Received order event: ${JSON.stringify(data)}`)
})

const pizzaRestaurant = new Restaurant(
  [
    new Product(
      "Pizza Margherita",
      new Money(5.0, "EUR"),
    ),
    new Product(
      "Pizza Capricciosa",
      new Money(6.0, "EUR"),
    ),
    new Product(
      "Pizza Quattro Stagioni",
      new Money(7.0, "EUR"),
    ),
  ],
)

const john = new Customer("John", "Doe")

const johnsOrder = john.order(
  pizzaRestaurant,
  new StreetAddress("Via Roma 1", "Roma", "00100"),
  [
    ["Pizza Capricciosa", 2],
    ["Pizza Margherita", 1],
  ],
)

console.log("=== EVENTS ===")
johnsOrder.setEventBus(eventBus)
johnsOrder.initialize()
//johnsOrder.cancel()
johnsOrder.approve()
johnsOrder.pay()

console.log("=== RESTAURANT ===")
console.log(JSON.stringify(pizzaRestaurant, null, 2))
console.log("=== CUSTOMER ===")
console.log(JSON.stringify(john, null, 2))
console.log("=== ORDER ===")
console.log(JSON.stringify(johnsOrder, null, 2))

