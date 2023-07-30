import { Game } from "Game/Game";
import { Renderable } from "Game/core";
import { Entity } from "Game/core/Entity";
import { KeyboardKeyCode } from "Game/modules/Keyboard/enums";
import { HealthBar } from "../HealthBar";
import { Gun } from "./Gun";
import { Base } from "./Base";

export class Player extends Entity implements Renderable {
	public isInGame = true;
	public maxWidth = 180;

	private game: Game;

	private initialSpeed = this.speed;
	private speedBoost = 5;

	private gun: Gun;
	private base: Base;

	private shootTime = 0;

	private healthBar: HealthBar;

	constructor(game: Game) {
		super({
			lives: 10,
			speed: 5,
		});

		this.game = game;
		this.base = new Base(this.game, this);

		this.initSize();
		this.initPosition();

		this.gun = new Gun(this.game, this);

		this.healthBar = new HealthBar({
			game: this.game,
			entity: this,
			color: "green",
			offsetXMultip: 0.65,
			offsetYMultip: 0.17,
		});
	}

	private initSize() {
		this.width = this.base.width;
		this.height = this.base.height;
	}

	private initPosition() {
		this.x = this.game.renderer.canvasWidth * 0.5 - this.width * 0.5;
		this.y = this.game.renderer.canvasHeight - this.height - 5;
	}

	public update() {
		this.handleSelfUpdate();

		this.gun.update();
		this.base.update();
		this.healthBar.update();
	}

	private handleSelfUpdate() {
		this.shootTime += this.game.deltaTime;

		if (this.game.keyboard.isKeyPressed(KeyboardKeyCode.J)) {
			this.moveLeft();
		}

		if (this.game.keyboard.isKeyPressed(KeyboardKeyCode.K)) {
			this.moveRight();
		}

		if (this.game.keyboard.isKeyPressed(KeyboardKeyCode.SPACE)) {
			this.boostSpeed();
		} else {
			this.resetSpeed();
		}

		this.handleFKeyPressed();

		this.handleDKeyClicked();
		this.handleSKeyClicked();
	}

	private handleFKeyPressed() {
		if (this.game.keyboard.isKeyPressed(KeyboardKeyCode.F)) {
			this.shootLight();
			return;
		}

		this.resetShootingTime();
	}

	private shootLight() {
		if (!this.isShootingTime) return;

		const bullet = this.game.lightBulletsPool.getObject();
		if (bullet) {
			bullet.pushInGame(
				this.gun.x + this.gun.width * 0.5 - bullet.width * 0.5,
				this.gun.y
			);
		}

		this.resetShootingTime();
	}

	private get isShootingTime(): boolean {
		return this.shootTime > this.game.deltaTime * 2;
	}

	private handleDKeyClicked() {
		if (!this.game.keyboard.isKeyClicked(KeyboardKeyCode.D)) return;
		this.shootMedium();
	}

	private shootMedium() {
		const bullet = this.game.mediumBulletsPool.getObject();
		if (bullet) {
			bullet.pushInGame(
				this.gun.x + this.gun.width * 0.5 - bullet.width * 0.5,
				this.gun.y
			);
		}
	}

	private handleSKeyClicked() {
		if (!this.game.keyboard.isKeyClicked(KeyboardKeyCode.S)) return;
		this.shootHeavy();
	}

	private shootHeavy() {
		const bullet = this.game.heavyBulletsPool.getObject();
		if (bullet) {
			bullet.pushInGame(
				this.gun.x + this.gun.width * 0.5 - bullet.width * 0.5,
				this.gun.y
			);
		}
	}

	private resetShootingTime() {
		this.shootTime = 0;
	}

	moveLeft() {
		if (this.x > 0 - this.width * 0.5) {
			this.x -= this.speed;
			return;
		}

		this.x = 0 - this.width * 0.5;
	}

	moveRight() {
		if (this.x + this.width * 0.5 < this.game.renderer.canvasWidth) {
			this.x += this.speed;
			return;
		}

		this.x = this.game.renderer.canvasWidth - this.width * 0.5;
	}

	private boostSpeed() {
		this.speed = this.initialSpeed + this.speedBoost;
	}

	private resetSpeed() {
		this.speed = this.initialSpeed;
	}

	public render() {
		this.base.render();
		this.gun.render();
		this.healthBar.render();
	}

	public takeDamage(amount = 1) {
		this.lives -= amount;
	}
}
