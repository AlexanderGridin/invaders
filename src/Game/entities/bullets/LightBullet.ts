import { Size } from "Game/core/models";
import { Game } from "Game/Game";
import { Bullet } from "./Bullet";

export class LightBullet extends Bullet {
  constructor(game: Game) {
    super({ game, damage: 1, assetName: "light-bullet" });

    const { width, height } = game.config.bullets.light;
    this.size = new Size(width, height);
  }
}
