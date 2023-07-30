import { Game } from "Game/Game";
import { Enemy } from "./Enemy";

export class LightEnemy extends Enemy {
  constructor(game: Game) {
    super({
      game,
      lives: 5,
      speed: 2,
    });

    this.initAsset("enemy-light");
    this.initSize();
    this.initPosition(0, 0);
  }
}
