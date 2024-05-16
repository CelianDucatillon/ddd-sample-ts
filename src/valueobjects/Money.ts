export class Money {

  constructor(
    private _amount: number,
    private _currency: "EUR" | "USD",
  ) {}

  get amount(): number {
    return this._amount
  }

  get currency(): "EUR" | "USD" {
    return this._currency
  }

  add(other: Money): Money {
    if (this._currency !== other._currency) {
      throw new Error("Cannot add different currencies")
    }
    return new Money(this._amount + other._amount, this._currency)
  }

  multiply(factor: number): Money {
    return new Money(this._amount * factor, this._currency)
  }

  toString(): string {
    return Money.formatCurrency(this._amount, this._currency)
  }

  private static formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat(currency === "EUR" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }
}
