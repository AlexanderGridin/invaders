import { Render, Update } from "Game/core/interfaces";
import { Game } from "Game/Game";
import { ObjectsPoolItem } from "./ObjectsPoolItem";

interface ObjectsPoolConfig {
  game: Game;
  maxItems: number;
  entityClass: { new (game: Game): ObjectsPoolItem };
}

export class ObjectsPoolNEW<T extends ObjectsPoolItem> implements Update, Render {
  public pool: ObjectsPoolItem[] = [];

  private game: Game;
  private maxItems = 0;
  private entityClass: {
    new (game: Game): ObjectsPoolItem;
  };

  constructor({ game, maxItems, entityClass }: ObjectsPoolConfig) {
    this.game = game;
    this.maxItems = maxItems;
    this.entityClass = entityClass;

    this.init();
  }

  private init() {
    for (let i = 0; i < this.maxItems; i++) {
      this.pool.push(new this.entityClass(this.game));
    }
  }

  public getObject(): T | null {
    let obj: T | null = null;

    for (let item of this.pool) {
      if (item.isInGame) continue;
      obj = item as T;
      break;
    }

    return obj;
  }

  public update() {
    for (let obj of this.pool) {
      if (!obj.isInGame) continue;
      obj.update();
    }
  }

  public render() {
    for (let obj of this.pool) {
      if (!obj.isInGame) continue;
      obj.render();
    }
  }

  public reset() {
    for (let obj of this.pool) {
      if (!obj.isInGame) continue;
      obj.pullFromGame();
    }
  }

  public forEachInGame(onInGameObject: (obj: T) => void) {
    for (let obj of this.pool) {
      if (!obj.isInGame) continue;
      onInGameObject(obj as T);
    }
  }
}
