import { Render, Update } from "Game/core/interfaces";
import { Position } from "Game/core/models";
import { MovableGameObject } from "Game/core/models/MovableGameObject";
import { Velocity } from "Game/core/models/Velocity";
import { toInt } from "Game/core/utils";
import { Game } from "Game/Game";
import { KeyboardKeyCode } from "Game/modules/Keyboard/enums";
import { Base } from "./Base";
import { Gun } from "./Gun";

export class Player extends MovableGameObject implements Update, Render {
  public base: Base;
  public gun: Gun;

  private game: Game;
  private speedBoost: number;

  constructor(game: Game) {
    super({ velocity: new Velocity(game.config.player.speed) });

    this.game = game;
    this.base = new Base(game, this);
    this.gun = new Gun(game, this);
    this.speedBoost = game.config.player.speedBoost;

    this.initPosition();
  }

  private initPosition() {
    const posX = this.game.renderer.canvasWidth * 0.5 - this.base.size.width * 0.5;
    const posY = this.game.renderer.canvasHeight - this.base.size.height - 5;
    this.position = new Position(posX, posY);
  }

  public update() {
    this.selfUpdate();
    this.base.update();
    this.gun.update();
  }

  private selfUpdate() {
    this.handleJKeyPressed();
    this.handleKKeyPressed();
    this.handleSpaceKeyPressed();
  }

  private handleJKeyPressed() {
    if (!this.game.keyboard.isKeyPressed(KeyboardKeyCode.J)) return;
    this.moveLeft();
  }

  private moveLeft() {
    const gunMiddleX = toInt(this.gun.position.x + this.gun.size.width * 0.5 - this.velocity.x);

    if (gunMiddleX >= 0) {
      this.position.decreaseX(this.velocity.x);
      return;
    }

    const distanceToGunMiddle = this.base.position.x - this.gun.position.x - this.gun.size.width * 0.5;
    this.position.setX(distanceToGunMiddle);
  }

  private handleKKeyPressed() {
    if (!this.game.keyboard.isKeyPressed(KeyboardKeyCode.K)) return;
    this.moveRight();
  }

  private moveRight() {
    const gunMiddleX = toInt(this.gun.position.x + this.gun.size.width * 0.5 + this.velocity.x);

    if (gunMiddleX < this.game.renderer.canvasWidth) {
      this.position.increaseX(this.velocity.x);
      return;
    }

    const distanceToGunMiddle = this.base.position.x - this.gun.position.x - this.gun.size.width * 0.5;
    this.position.setX(this.game.renderer.canvasWidth + distanceToGunMiddle);
  }

  private handleSpaceKeyPressed() {
    if (!this.game.keyboard.isKeyPressed(KeyboardKeyCode.SPACE)) {
      this.velocity.reset();
      return;
    }

    if (this.velocity.x > this.velocity.initial.x) return;

    this.velocity.setX(this.velocity.x + this.speedBoost);
  }

  public render() {
    this.base.render();
    this.gun.render();
  }
}
