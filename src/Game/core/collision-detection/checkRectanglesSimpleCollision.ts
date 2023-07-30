interface Collidable {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Config {
  a: Collidable;
  b: Collidable;
  speedX?: number;
  speedY?: number;
}

export const checkRectanglesSimpleCollision = ({ a, b, speedX = 0, speedY = 0 }: Config): boolean =>
  a.x < b.x + b.width + speedY &&
  a.x + a.width + speedX > b.x &&
  a.y < b.y + b.height + speedY &&
  a.y + a.height + speedX > b.y;
