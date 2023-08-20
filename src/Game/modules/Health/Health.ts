export class Health {
  private _amount: number;

  constructor(amount: number) {
    this._amount = amount;
  }

  public get amount() {
    return this._amount;
  }

  public increase(amount = 1) {
    this._amount += amount;
  }

  public descrease(amount = 1) {
    this._amount -= amount;
  }
}
