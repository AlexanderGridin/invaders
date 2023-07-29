import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { GameObject, Renderable } from "Game/core";
import { checkRectanglesSimpleCollision } from "Game/core/collision-detection";
import { Entity } from "Game/core/Entity";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { defineScale } from "Game/utils";
import { HealthBar } from "./HealthBar";

export class Enemy extends Entity implements Renderable {
	private game: Game;
	private asset!: ImgAsset;

	public isInGame = true;

	private healthBar = new GameObject({});
	private newHealthBar!: HealthBar;

	constructor(game: Game) {
		super({
			lives: 10,
			speed: 0,
		});

		this.game = game;

		this.newHealthBar = new HealthBar({
			game: this.game,
			entity: this,
			offsetXMultip: 0.3,
			offsetYMultip: 0.03,
			color: "red",
		});

		this.init();
	}

	public init() {
		const asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>(
			"enemy-hard"
		);
		if (!asset) return;
		this.asset = asset;

		this.scale = defineScale(120, this.asset.width);
		this.width = this.asset.width * this.scale;
		this.height = this.asset.height * this.scale;

		this.x = this.game.renderer.canvasWidth * 0.5 - this.width * 0.5;
	}

	public update() {
		if (!this.isInGame) return;

		this.y += this.speed;

		if (
			this.y >= this.game.renderer.canvasHeight - this.height ||
			checkRectanglesSimpleCollision({ a: this, b: this.game.player })
		) {
			this.game.player.ascceptDamage();
			this.pullFromGame();
		}

		this.game.bulletsPool.forEachInGame((bullet) => {
			if (!checkRectanglesSimpleCollision({ a: this, b: bullet })) {
				return;
			}

			this.decreaseLives(bullet.damage);
			bullet.pullFromGame();

			if (this.lives === 0) {
				this.pullFromGame();
			}
		});

		this.newHealthBar.update();
	}

	private pullFromGame() {
		this.isInGame = false;
	}

	private decreaseLives(amount = 1) {
		this.lives -= amount;
		this.healthBar.width -= 5;
	}

	public render() {
		if (!this.isInGame) return;

		this.game.renderer.drawImage({
			asset: this.asset,
			obj: this,
		});

		this.newHealthBar.render();

		if (this.game.isDebug) {
			this.game.renderer.strokeRect({ obj: this });
		}
	}
}
