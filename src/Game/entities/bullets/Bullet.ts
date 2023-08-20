import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { Velocity } from "Game/core/models/Velocity";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { ObjectsPoolItem } from "Game/modules/ObjectsPool";

interface BulletConfig {
  game: Game;
  damage: number;
  assetName: AssetName;
}

export class Bullet extends ObjectsPoolItem {
  public damage: number;

  protected asset!: ImgAsset;

  constructor({ game, damage, assetName }: BulletConfig) {
    super(game);

    this.damage = damage;
    this.velocity = new Velocity(0, 10);
    this.initAsset(assetName);
  }

  private initAsset(assetName: AssetName) {
    const asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>(assetName);
    if (!asset) throw new Error("Asset for bullet is not found!");
    this.asset = asset;
  }

  public update() {
    this.position.decreaseY(this.velocity.y);

    this.handleGunCorrection();

    if (this.position.y <= 0) {
      this.pullFromGame();
    }
  }

  private handleGunCorrection() {
    const playerGun = this.game.player.gun;
    const isOutOfGun = this.position.y + this.size.height < playerGun.position.y;

    if (isOutOfGun) return;
    this.position.setX(playerGun.position.x + playerGun.size.width * 0.5 - this.size.width * 0.5 - 1);
  }

  public render() {
    this.game.renderer.drawImage({ img: this.asset, position: this.position, size: this.size });

    if (this.game.isDebug) {
      this.game.renderer.strokeRect({ obj: this, color: "yellow" });
    }
  }
}
