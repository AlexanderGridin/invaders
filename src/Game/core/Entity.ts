import { GameObject, GameObjectConfig } from "./GameObject";

export interface EntityConfig extends GameObjectConfig {
	lives: number;
	speed: number;
}

export class Entity extends GameObject {
	protected lives: number;
	protected speed: number;

	constructor({ lives, speed, ...gameObjectConfig }: EntityConfig) {
		super({ ...gameObjectConfig });

		this.lives = lives;
		this.speed = speed;
	}
}
