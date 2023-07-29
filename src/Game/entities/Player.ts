import { Game } from "Game/Game";
import { GameObject, Renderable } from "Game/core";
import { Entity } from "Game/core/Entity";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { KeyboardKeyCode } from "Game/modules/Keyboard/enums";
import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { defineScale } from "Game/utils";
import { HealthBar } from "./HealthBar";

type PlayerAsset = Record<"base" | "gun", ImgAsset>;

export class Player extends Entity implements Renderable {
	private game: Game;

	private initialSpeed = this.speed;
	private speedBoost = 5;

	private gun = new GameObject({});
	private gunXOffset = 0;
	private gunYOffset = 0;

	private asset: PlayerAsset = {} as PlayerAsset;

	private shootTime = 0;

	private healthBar: HealthBar;
	public isInGame = true;

	constructor(game: Game) {
		super({
			lives: 5,
			speed: 5,
		});

		this.game = game;

		this.healthBar = new HealthBar({
			game: this.game,
			entity: this,
			color: "green",
			offsetXMultip: 0.8,
			offsetYMultip: 0.17,
		});

		this.init();
	}

	public init() {
		const gunAsset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>(
			"player-gun"
		);

		const baseAsset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>(
			"player-base"
		);

		if (!gunAsset || !baseAsset) {
			return;
		}

		this.asset.gun = gunAsset;
		this.asset.base = baseAsset;

		this.scale = defineScale(150, this.asset.gun.height);
		this.setSize();

		this.gun.scale = defineScale(150, this.asset.gun.height);
		this.setGunSize();
		this.gunXOffset = this.gun.width * 0.2;
		this.gunYOffset = this.gun.height * 0.45;

		this.setInitialPosition();
	}

	private setSize() {
		this.width = this.asset.base.width * this.scale;
		this.height = this.asset.base.height * this.scale;
	}

	private setGunSize() {
		this.gun.width = this.asset.gun.width * this.gun.scale;
		this.gun.height = this.asset.gun.height * this.gun.scale;
	}

	private setInitialPosition() {
		this.x = this.game.renderer.canvasWidth * 0.5 - this.width * 0.5;
		this.y = this.game.renderer.canvasHeight - this.height - 5;
	}

	public update() {
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

		if (this.game.keyboard.isKeyPressed(KeyboardKeyCode.F)) {
			this.shoot();
		} else {
			this.shootTime = 0;
		}

		this.syncGunPosition();
		this.healthBar.update();
	}

	private shoot() {
		if (!this.isShootingTime) return;

		const bullet = this.game.bulletsPool.getObject();
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

	private resetShootingTime() {
		this.shootTime = 0;
	}

	syncGunPosition() {
		this.gun.x =
			this.x + this.width * 0.5 - this.gun.width * 0.5 - this.gunXOffset;

		this.gun.y = this.y - this.gunYOffset;
	}

	moveLeft() {
		if (this.x > 0 - this.width * 0.5 + this.gunXOffset) {
			this.x -= this.speed;
			return;
		}

		this.x = 0 - this.width * 0.5 + this.gunXOffset;
	}

	moveRight() {
		if (
			this.x + this.width * 0.5 - this.gunXOffset <
			this.game.renderer.canvasWidth
		) {
			this.x += this.speed;
			return;
		}

		this.x =
			this.game.renderer.canvasWidth - this.width * 0.5 + this.gunXOffset;
	}

	private boostSpeed() {
		this.speed = this.initialSpeed + this.speedBoost;
	}

	private resetSpeed() {
		this.speed = this.initialSpeed;
	}

	public render() {
		this.renderAssets();
		this.healthBar.render();

		if (this.game.isDebug) {
			this.renderHitboxes();
		}
	}

	private renderAssets() {
		this.game.renderer.drawImage({
			asset: this.asset.base,
			obj: this,
		});

		this.game.renderer.drawImage({
			asset: this.asset.gun,
			obj: this.gun,
		});
	}

	private renderHitboxes() {
		this.game.renderer.strokeRect({
			obj: this,
			color: "blue",
		});

		this.game.renderer.strokeRect({
			obj: this.gun,
			color: "red",
		});
	}

	public ascceptDamage(amount = 1) {
		this.lives -= amount;
	}
}
