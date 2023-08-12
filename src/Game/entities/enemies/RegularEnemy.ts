import { Velocity } from "Game/core/models/Velocity";
import { Game } from "Game/Game";
import { Enemy } from "./Enemy";

export class RegularEnemy extends Enemy {
  constructor(game: Game) {
    super({
      game,
      lives: 10,
      velocity: new Velocity(0, 1.5),
      assetName: "tr",
    });
  }
}
