import { GameObjectOLD, GameObjectConfig } from "./GameObject";

export interface EntityConfig extends GameObjectConfig {
  lives: number;
  speed: number;
}

export class Entity extends GameObjectOLD {
  public lives = 0;
  public speed: number;

  constructor({ lives, speed, ...gameObjectConfig }: EntityConfig) {
    super({ ...gameObjectConfig });

    this.lives = lives;
    this.speed = speed;
  }
}
