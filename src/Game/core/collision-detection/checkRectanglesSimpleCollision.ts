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
  a.x - speedX < b.x + b.width &&
  a.x + a.width + speedX > b.x &&
  a.y - speedY < b.y + b.height &&
  a.y + a.height + speedY > b.y;
