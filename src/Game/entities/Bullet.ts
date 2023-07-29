import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { ObjectsPoolEntity } from "Game/modules/ObjectsPool/ObjectsPoolEntity";
import { defineScale } from "Game/utils";

export class Bullet extends ObjectsPoolEntity {
	public damage = 1;

	private speed = 10;
	private asset!: ImgAsset;

	constructor(game: Game) {
		super({ game, width: 5, height: 10 });
		this.init();
	}

	public init() {
		const asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>("bullet");
		if (!asset) return;
		this.asset = asset;

		this.scale = defineScale(7, this.asset.width);
		this.width = this.asset.width * this.scale;
		this.height = this.asset.height * this.scale;
	}

	public update() {
		this.y -= this.speed;

		if (this.y <= 0) {
			this.pullFromGame();
		}
	}

	public render() {
		this.game.renderer.drawImage({
			asset: this.asset,
			obj: this,
		});

		if (this.game.isDebug) {
			this.game.renderer.strokeRect({ obj: this, color: "yellow" });
		}
	}
}
