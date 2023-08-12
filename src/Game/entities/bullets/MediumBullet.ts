import { Size } from "Game/core/models";
import { Game } from "Game/Game";
import { Bullet } from "./Bullet";

export class MediumBullet extends Bullet {
  constructor(game: Game) {
    super({ game, damage: 5, assetName: "medium-bullet" });

    const { width, height } = game.config.bullets.medium;
    this.size = new Size(width, height);
  }
}
