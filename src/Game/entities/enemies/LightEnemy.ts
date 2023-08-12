import { Velocity } from "Game/core/models/Velocity";
import { Game } from "Game/Game";
import { Enemy } from "./Enemy";

export class LightEnemy extends Enemy {
  constructor(game: Game) {
    super({
      game,
      lives: 5,
      velocity: new Velocity(0, 2),
      assetName: "tl",
    });
  }
}
