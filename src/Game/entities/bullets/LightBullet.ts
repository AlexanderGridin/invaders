import { Game } from "Game/Game";
import { Bullet } from "./Bullet";

export class LightBullet extends Bullet {
  public damage = 1;
  protected maxWidth = 7;

  constructor(game: Game) {
    super(game);

    this.initAsset("light-bullet");
    this.initSize();
  }
}
