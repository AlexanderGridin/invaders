import { Game } from "Game/Game";
import { Enemy } from "./Enemy";

export class HeavyEnemy extends Enemy {
  constructor(game: Game) {
    super({
      game,
      lives: 30,
      speed: 0.5,
    });

    this.initAsset("enemy-hard");
    this.initSize();
    this.initPosition(this.width * 3 + 45, 0);
  }
}
