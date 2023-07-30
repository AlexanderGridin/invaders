import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { Renderable } from "Game/core";
import { checkRectanglesSimpleCollision } from "Game/core/collision-detection";
import { Entity } from "Game/core/Entity";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { defineScale } from "Game/utils";
import { Bullet } from "../bullets/Bullet";
import { HealthBar } from "../HealthBar";

interface EnemyConfig {
	game: Game;
	lives: number;
	speed: number;
}

export class Enemy extends Entity implements Renderable {
	private game: Game;
	private asset!: ImgAsset;

	public isInGame = true;

	private healthBar!: HealthBar;

	private isSlowDown = false;
	private slowDownTime = 0;

	private initialSpeed = 0;

	constructor({ game, lives, speed }: EnemyConfig) {
		super({
			speed,
			lives,
		});

		this.initialSpeed = speed;
		this.game = game;

		this.healthBar = new HealthBar({
			game: this.game,
			entity: this,
			offsetXMultip: 0.3,
			offsetYMultip: 0.03,
			color: "red",
		});
	}

	public initAsset(assetName: AssetName) {
		const asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>(assetName);
		if (!asset) return;
		this.asset = asset;
	}

	public initSize() {
		this.scale = defineScale(120, this.asset.width);
		this.width = this.asset.width * this.scale;
		this.height = this.asset.height * this.scale;
	}

	public initPosition(
		x = this.game.renderer.canvasWidth * 0.5 - this.width * 0.5,
		y = 0
	) {
		this.x = x;
		this.y = y;
	}

	public update() {
		if (!this.isInGame) return;

		this.y += this.speed;

		if (
			this.y >= this.game.renderer.canvasHeight - this.height ||
			checkRectanglesSimpleCollision({ a: this, b: this.game.player })
		) {
			this.game.player.takeDamage();
			this.pullFromGame();
		}

		this.game.bulletsManager.forEachInGame(
			this.handleBulletCollision.bind(this)
		);

		this.handleSlowDown();
		this.healthBar.update();
	}

	private handleSlowDown() {
		if (!this.isSlowDown) return;

		this.slowDownTime += this.game.deltaTime;

		if (this.slowDownTime < 1000) return;

		this.isSlowDown = false;
		this.speed = this.initialSpeed;
		this.slowDownTime = 0;
	}

	private handleBulletCollision(bullet: Bullet) {
		if (!checkRectanglesSimpleCollision({ a: this, b: bullet })) {
			return;
		}

		this.takeDamage(bullet.damage);

		if (!this.isSlowDown) {
			this.isSlowDown = true;
			this.speed *= 0.5;
		}

		bullet.pullFromGame();

		if (this.lives <= 0) {
			this.pullFromGame();
		}
	}

	private pullFromGame() {
		this.isInGame = false;
	}

	private takeDamage(amount = 1) {
		this.lives -= amount;
	}

	public render() {
		if (!this.isInGame) return;

		this.game.renderer.drawImage({
			asset: this.asset,
			obj: this,
		});

		this.healthBar.render();

		if (this.game.isDebug) {
			this.game.renderer.strokeRect({ obj: this });
		}
	}
}
