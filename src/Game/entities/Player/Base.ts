import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { Render, Update } from "Game/core/interfaces";
import { GameObject, Size } from "Game/core/models";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { Player } from "./Player";

export class Base extends GameObject implements Update, Render {
  private game: Game;
  private player: Player;
  public asset: ImgAsset;

  constructor(game: Game, player: Player) {
    const { width, height } = game.config.player.base;
    super({ size: new Size(width, height) });

    this.game = game;
    this.player = player;
    this.asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>("t-base");
  }

  public update() {
    const { x, y } = this.player.position;

    this.position.setX(x);
    this.position.setY(y);
  }

  public render() {
    this.game.renderer.drawImageNew({ img: this.asset, position: this.position, size: this.size });

    if (this.game.isDebug) {
      this.game.renderer.strokeRectNew({ obj: this, color: "blue" });
    }
  }
}
