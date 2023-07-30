export interface GameObjectConfig {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  scale?: number;
}

export class GameObject {
  public x: number;
  public y: number;

  public width: number;
  public height: number;

  public scale: number;

  constructor({ x = 0, y = 0, width = 0, height = 0, scale = 1 }: GameObjectConfig) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.scale = scale;
  }
}
