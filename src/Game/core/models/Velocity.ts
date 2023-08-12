import { toInt } from "../utils";

export class Velocity {
  private _initial: { x: number; y: number };
  private _x: number;
  private _y: number;

  constructor(x = 0, y = 0) {
    this._initial = { x: toInt(x), y: toInt(y) };
    this._x = toInt(x);
    this._y = toInt(y);
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public update(amount: number) {
    this._x = toInt(amount);
    this._y = toInt(amount);
  }

  public reset() {
    this._x = this._initial.x;
    this._y = this._initial.y;
  }

  public setX(amount: number) {
    this._x = toInt(amount);
  }

  public setY(amount: number) {
    this._y = toInt(amount);
  }

  public increase(amount: number) {
    this._x += toInt(amount);
    this._y += toInt(amount);
  }

  public increaseX(amount: number) {
    this._x += toInt(amount);
  }

  public decrease(amount: number) {
    this._x -= toInt(amount);
    this._y -= toInt(amount);
  }

  public get initial() {
    return this._initial;
  }
}
