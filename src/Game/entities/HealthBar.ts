import { Game } from "Game/Game";
import { GameObjectOLD, GameObjectConfig, Renderable } from "Game/core";
import { Entity } from "Game/core/Entity";

type HealthBarEntity = Entity & { isInGame: boolean };

interface HealthBarConfig extends GameObjectConfig {
  game: Game;
  entity: HealthBarEntity;

  offsetXMultip?: number;
  offsetYMultip?: number;

  color?: string;
}

export class HealthBar extends GameObjectOLD implements Renderable {
  private game: Game;
  private entity: HealthBarEntity;

  private offsetXMultip: number;
  private offsetYMultip: number;

  private initialWidth = 0;
  private color: string;

  public height = 5;

  constructor({
    game,
    entity,
    offsetXMultip = 0,
    offsetYMultip = 0,
    color = "#000",
    ...gameObjectProps
  }: HealthBarConfig) {
    super({ ...gameObjectProps });

    this.game = game;
    this.entity = entity;

    this.offsetXMultip = offsetXMultip;
    this.offsetYMultip = offsetYMultip;

    this.color = color;

    this.init();
  }

  public init() {
    this.calcPosition();

    this.initialWidth = this.entity.lives * 5;
    this.width = this.initialWidth;
  }

  private calcPosition() {
    this.x = this.entity.x + this.entity.width * this.offsetXMultip;
    this.y = this.entity.y + this.entity.height * this.offsetYMultip;
  }

  public update() {
    if (!this.entity.isInGame) return;
    this.calcPosition();
    this.width = this.entity.lives * 5;
  }

  public render() {
    if (!this.initialWidth) {
      throw new Error(
        "In looks like you forgot to call init() method of the HealthBar, so it is unable to render properly..."
      );
    }

    this.game.renderer.fillRect({ obj: this, color: this.color });
    this.game.renderer.strokeRect({
      obj: {
        ...this,
        width: this.initialWidth,
      },
      color: this.color,
    });
  }
}
