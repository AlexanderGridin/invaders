import { Velocity } from "Game/core/models/Velocity";
import { Game } from "Game/Game";
import { Enemy } from "./Enemy";

export class HeavyEnemy extends Enemy {
  constructor(game: Game) {
    super({
      game,
      lives: 30,
      velocity: new Velocity(0, 0.5),
      assetName: "th",
    });
  }
}
