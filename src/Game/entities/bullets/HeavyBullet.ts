import { Game } from "Game/Game";
import { Bullet } from "./Bullet";

export class HeavyBullet extends Bullet {
  protected maxWidth = 15;
  public damage = 10;

  constructor(game: Game) {
    super(game);

    this.initAsset("heavy-bullet");
    this.initSize();
  }
}
