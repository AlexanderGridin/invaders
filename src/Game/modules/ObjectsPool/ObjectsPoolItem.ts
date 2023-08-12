import { Render, Update } from "Game/core/interfaces";
import { Position } from "Game/core/models";
import { MovableGameObject } from "Game/core/models/MovableGameObject";
import { Game } from "Game/Game";

export abstract class ObjectsPoolItem extends MovableGameObject implements Update, Render {
  public isInGame = false;

  protected game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  public pullFromGame() {
    this.isInGame = false;
  }

  public pushInGame({ x, y }: Position) {
    this.position.setX(x);
    this.position.setY(y);

    this.isInGame = true;
  }

  public abstract update(): void;
  public abstract render(): void;
}
