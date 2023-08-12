import { toInt } from "../utils";

export class Position {
  private _x: number;
  private _y: number;

  constructor(x = 0, y = 0) {
    this._x = toInt(x);
    this._y = toInt(y);
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public setX(x: number) {
    this._x = toInt(x);
  }

  public setY(y: number) {
    this._y = toInt(y);
  }

  public increaseX(amount: number) {
    this._x += toInt(amount);
  }

  public decreaseX(amount: number) {
    this._x -= toInt(amount);
  }

  public increaseY(amount: number) {
    this._y += toInt(amount);
  }

  public decreaseY(amount: number) {
    this._y -= toInt(amount);
  }
}
