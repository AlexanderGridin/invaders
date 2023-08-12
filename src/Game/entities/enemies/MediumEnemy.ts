import { Velocity } from "Game/core/models/Velocity";
import { Game } from "Game/Game";
import { Enemy } from "./Enemy";

export class MediumEnemy extends Enemy {
  constructor(game: Game) {
    super({
      game,
      lives: 20,
      velocity: new Velocity(0, 1),
      assetName: "tm",
    });
  }
}
