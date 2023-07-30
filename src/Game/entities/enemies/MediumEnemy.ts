import { Game } from "Game/Game";
import { Enemy } from "./Enemy";

export class MediumEnemy extends Enemy {
	constructor(game: Game) {
		super({
			game,
			lives: 20,
			speed: 1,
		});

		this.initAsset("enemy-medium");
		this.initSize();
		this.initPosition(this.width * 2 + 30);
	}
}
