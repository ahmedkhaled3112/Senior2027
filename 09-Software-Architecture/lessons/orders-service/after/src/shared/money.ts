// Value object: immutable, equal by value, always in minor units.
export class Money {
  readonly minor: number;
  readonly currency: string;

  private constructor(minor: number, currency: string) {
    this.minor = minor;
    this.currency = currency;
    Object.freeze(this);
  }

  static of(minor: number, currency: string): Money {
    if (!Number.isSafeInteger(minor)) throw new RangeError(`Money needs a safe integer of minor units, got ${minor}`);
    if (!/^[A-Z]{3}$/.test(currency)) throw new RangeError(`bad currency ${currency}`);
    return new Money(minor, currency);
  }

  add(other: Money): Money {
    if (other.currency !== this.currency) throw new TypeError(`cannot add ${other.currency} to ${this.currency}`);
    return new Money(this.minor + other.minor, this.currency);
  }

  times(qty: number): Money {
    return Money.of(this.minor * qty, this.currency);
  }

  // half-up rounding, always applied here so no caller invents its own
  percent(pct: number): Money {
    return Money.of(Math.round((this.minor * pct) / 100), this.currency);
  }

  equals(other: Money): boolean {
    return this.minor === other.minor && this.currency === other.currency;
  }
}
