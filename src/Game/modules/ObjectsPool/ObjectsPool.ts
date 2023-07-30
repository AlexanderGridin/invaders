import { Game } from "Game/Game";
import { ObjectsPoolEntity } from "./ObjectsPoolEntity";

interface ObjectsPoolConfig {
  game: Game;
  limit: number;
  entityClass: { new (game: Game): ObjectsPoolEntity };
}

export class ObjectsPool<T extends ObjectsPoolEntity> {
  private game: Game;
  private limit = 0;
  private entityClass: {
    new (game: Game): ObjectsPoolEntity;
  };

  public pool: ObjectsPoolEntity[] = [];

  constructor({ game, limit, entityClass }: ObjectsPoolConfig) {
    this.game = game;
    this.limit = limit;
    this.entityClass = entityClass;

    this.init();
  }

  private init() {
    for (let i = 0; i < this.limit; i++) {
      this.pool.push(new this.entityClass(this.game));
    }
  }

  public getObject(): T | null {
    let obj: T | null = null;

    this.pool.some((item) => {
      if (!item.isInGame) {
        obj = item as T;
        return true;
      }

      return false;
    });

    return obj;
  }

  public update() {
    this.pool.forEach((obj) => {
      if (!obj.isInGame) {
        return;
      }

      obj.update();
    });
  }

  public render() {
    this.pool.forEach((obj) => {
      if (!obj.isInGame) {
        return;
      }

      obj.render();
    });
  }

  public reset() {
    this.pool.forEach((obj) => {
      if (!obj.isInGame) {
        return;
      }

      obj.pullFromGame();
    });
  }

  public forEachInGame(onInGameObject: (obj: T) => void) {
    this.pool.forEach((obj) => {
      if (!obj.isInGame) {
        return;
      }

      onInGameObject(obj as T);
    });
  }
}
