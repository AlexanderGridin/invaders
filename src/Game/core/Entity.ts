import { GameObject, GameObjectConfig } from "./GameObject";

export interface EntityConfig extends GameObjectConfig {
	lives: number;
	speed: number;
}

export class Entity extends GameObject {
	public lives: number;
	public speed: number;

	constructor({ lives, speed, ...gameObjectConfig }: EntityConfig) {
		super({ ...gameObjectConfig });

		this.lives = lives;
		this.speed = speed;
	}
}
