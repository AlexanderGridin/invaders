import { Position, Size } from "../models";
import { Velocity } from "../models/Velocity";

interface Collidable {
  position: Position;
  size: Size;
}

interface Config {
  a: Collidable;
  b: Collidable;
  velocity?: Velocity;
}

export const checkRectanglesSimpleCollision = ({ a, b, velocity = new Velocity() }: Config): boolean =>
  a.position.x - velocity.x < b.position.x + b.size.width &&
  a.position.x + a.size.width + velocity.x > b.position.x &&
  a.position.y - velocity.y < b.position.y + b.size.height &&
  a.position.y + a.size.height + velocity.y > b.position.y;
