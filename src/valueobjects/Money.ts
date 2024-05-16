export class Money {
  private amount: number
  private currency: "EUR" | "USD"

  constructor(amount: number, currency: "EUR" | "USD") {
    this.amount = amount
    this.currency = currency
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error("Cannot add different currencies")
    }
    return new Money(this.amount + other.amount, this.currency)
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency)
  }

  toString(): string {
    return Money.formatCurrency(this.amount, this.currency)
  }

  private static formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat(currency === "EUR" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }
}