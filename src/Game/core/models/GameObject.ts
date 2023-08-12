import { Position } from "./Position";
import { Size } from "./Size";

export interface GameObjectConfig {
  position?: Position;
  size?: Size;
}

export abstract class GameObject {
  public position: Position;
  public size: Size;

  constructor(config?: GameObjectConfig) {
    if (config) {
      const { position = new Position(), size = new Size() } = config;
      this.position = position;
      this.size = size;

      return;
    }

    this.position = new Position();
    this.size = new Size();
  }

  public abstract render(): void;
}
