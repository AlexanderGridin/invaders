import { GameObject, GameObjectConfig } from "./GameObject";
import { Velocity } from "./Velocity";

export interface MovableGameObjectConfig extends GameObjectConfig {
  velocity?: Velocity;
}

export abstract class MovableGameObject extends GameObject {
  public velocity: Velocity;

  constructor(config?: MovableGameObjectConfig) {
    if (config) {
      const { velocity = new Velocity(), ...superConfig } = config;
      super(superConfig);
      this.velocity = velocity;

      return;
    }

    super();
    this.velocity = new Velocity();
  }

  public abstract update(): void;
}
