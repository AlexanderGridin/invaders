import { GameObject, GameObjectConfig, Renderable } from "Game/core";
import { Game } from "Game/Game";

export interface ObjectsPoolEntityConfig extends GameObjectConfig {
	game: Game;
}

export class ObjectsPoolEntity extends GameObject implements Renderable {
	protected game: Game;
	public isInGame = false;

	constructor({ game, ...entityProps }: ObjectsPoolEntityConfig) {
		super({ ...entityProps });
		this.game = game;
	}

	public update() {}
	public render() {}

	public pullFromGame() {
		this.isInGame = false;
	}

	public pushInGame(x: number, y: number) {
		this.x = x;
		this.y = y;

		this.isInGame = true;
	}
}
