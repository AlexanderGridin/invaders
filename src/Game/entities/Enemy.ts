import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { Renderable } from "Game/core";
import { checkRectanglesSimpleCollision } from "Game/core/collision-detection";
import { Entity } from "Game/core/Entity";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { defineScale } from "Game/utils";
import { Bullet } from "./bullets/Bullet";
import { HealthBar } from "./HealthBar";

export class Enemy extends Entity implements Renderable {
	private game: Game;
	private asset!: ImgAsset;

	public isInGame = true;

	private healthBar!: HealthBar;

	constructor(game: Game) {
		super({
			lives: 10,
			speed: 0,
		});

		this.game = game;

		this.healthBar = new HealthBar({
			game: this.game,
			entity: this,
			offsetXMultip: 0.3,
			offsetYMultip: 0.03,
			color: "red",
		});

		this.init();
	}

	private init() {
		this.initAsset();
		this.initSize();
		this.initPosition();
	}

	private initAsset() {
		const asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>(
			"enemy-hard"
		);
		if (!asset) return;
		this.asset = asset;
	}

	private initSize() {
		this.scale = defineScale(120, this.asset.width);
		this.width = this.asset.width * this.scale;
		this.height = this.asset.height * this.scale;
	}

	private initPosition() {
		this.x = this.game.renderer.canvasWidth * 0.5 - this.width * 0.5;
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

		this.game.lightBulletsPool.forEachInGame(
			this.handleBulletCollision.bind(this)
		);
		this.game.mediumBulletsPool.forEachInGame(
			this.handleBulletCollision.bind(this)
		);
		this.game.heavyBulletsPool.forEachInGame(
			this.handleBulletCollision.bind(this)
		);

		this.healthBar.update();
	}

	private handleBulletCollision(bullet: Bullet) {
		if (!checkRectanglesSimpleCollision({ a: this, b: bullet })) {
			return;
		}

		this.takeDamage(bullet.damage);
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
