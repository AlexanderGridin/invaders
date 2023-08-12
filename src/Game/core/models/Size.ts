import { toInt } from "../utils";

export class Size {
  private _width: number;
  public _height: number;

  constructor(width = 0, height = 0) {
    this._width = toInt(width);
    this._height = toInt(height);
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public setWidth(width: number) {
    this._width = toInt(width);
  }

  public setHeight(height: number) {
    this._height = toInt(height);
  }
}
