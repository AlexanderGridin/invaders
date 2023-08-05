import { Game } from "Game/Game";
import { Enemy } from "./Enemy";

export class RegularEnemy extends Enemy {
  constructor(game: Game) {
    super({
      game,
      lives: 10,
      speed: 0,
    });

    this.initAsset("tr");
    this.initSize();
  }
}
