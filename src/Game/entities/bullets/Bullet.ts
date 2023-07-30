import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { ObjectsPoolEntity } from "Game/modules/ObjectsPool/ObjectsPoolEntity";
import { defineScale } from "Game/utils";

export class Bullet extends ObjectsPoolEntity {
  public damage = 1;

  private speed = 10;

  protected asset!: ImgAsset;
  protected maxWidth = 7;

  constructor(game: Game) {
    super({ game });
  }

  public initAsset(assetName: AssetName) {
    const asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>(assetName);
    if (!asset) throw new Error("Asset for bullet is not found!");
    this.asset = asset;
  }

  public initSize() {
    this.scale = defineScale(this.maxWidth, this.asset.width);
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
