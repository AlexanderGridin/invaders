import { Game } from "Game/Game";
import { MovableGameObject } from "Game/core/models/MovableGameObject";
import { Health } from "Game/modules/Health";

interface HealthBarConfig {
	game: Game;
	health: Health;
	color?: string;
}

export class HealthBar extends MovableGameObject {
	private game: Game;
	private health: Health;
	private initialWidth = 0;
	private color: string;

	constructor({
		game,
		health,
		color = "#000",
	}: HealthBarConfig) {
		super();

		this.game = game;
		this.health = health;
		this.color = color;

		this.init();
	}

	public init() {
		this.calcPosition();

		this.initialWidth = this.health.amount * 5;
		this.size.setWidth(this.initialWidth)
	}

	private calcPosition() {
		// this.x = this.entity.x + this.entity.width * this.offsetXMultip;
		// this.y = this.entity.y + this.entity.height * this.offsetYMultip;
	}

	public update() {
		// this.calcPosition();
		this.size.setWidth(this.health.amount * 5)
	}

	public render() {
		if (!this.initialWidth) {
			throw new Error(
				"In looks like you forgot to call init() method of the HealthBar, so it is unable to render properly..."
			);
		}

		this.game.renderer.fillRect({ obj: this, color: this.color });
		this.game.renderer.strokeRect({
			obj: {
				...this,
				width: this.initialWidth,
			},
			color: this.color,
		});
	}
}
