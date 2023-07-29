import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { GameObject, Renderable } from "Game/core";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { defineScale } from "Game/utils";
import { Player } from "./Player";

export class Gun extends GameObject implements Renderable {
	private game: Game;
	private player: Player;
	public asset!: ImgAsset;

	constructor(game: Game, player: Player) {
		super({});

		this.game = game;
		this.player = player;

		this.initAsset();
		this.initSize();
	}

	private initAsset() {
		const asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>(
			"player-gun"
		);
		if (!asset) return;
		this.asset = asset;
	}

	private initSize() {
		this.scale = defineScale(this.player.maxWidth * 0.88, this.asset.height);
		this.width = this.asset.width * this.scale;
		this.height = this.asset.height * this.scale;
	}

	public update() {
		this.x = this.player.x + this.player.width * 0.43 - this.width * 0.5;
		this.y =
			this.player.y +
			this.player.height -
			this.height -
			this.player.height * 0.1;
	}

	public render() {
		this.game.renderer.drawImage({
			asset: this.asset,
			obj: this,
		});

		if (this.game.isDebug) {
			this.game.renderer.strokeRect({
				obj: this,
				color: "red",
			});
		}
	}
}
