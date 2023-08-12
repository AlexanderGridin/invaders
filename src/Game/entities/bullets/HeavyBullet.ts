import { Size } from "Game/core/models";
import { Game } from "Game/Game";
import { Bullet } from "./Bullet";

export class HeavyBullet extends Bullet {
  constructor(game: Game) {
    super({ game, damage: 10, assetName: "heavy-bullet" });

    const { width, height } = game.config.bullets.heavy;
    this.size = new Size(width, height);
  }
}
