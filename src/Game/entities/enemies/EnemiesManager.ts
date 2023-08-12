import { Render, Update } from "Game/core/interfaces";
import { Game } from "Game/Game";
import { ObjectsPool } from "Game/modules/ObjectsPool";
import { Enemy } from "./Enemy";
import { HeavyEnemy } from "./HeavyEnemy";
import { LightEnemy } from "./LightEnemy";
import { MediumEnemy } from "./MediumEnemy";
import { RegularEnemy } from "./RegularEnemy";

type EnemyType = "light" | "regular" | "medium" | "heavy";

export class EnemiesManager implements Update, Render {
  private lightPool!: ObjectsPool<LightEnemy>;
  private regularPool!: ObjectsPool<RegularEnemy>;
  private mediumPool!: ObjectsPool<MediumEnemy>;
  private heavyPool!: ObjectsPool<HeavyEnemy>;

  constructor(game: Game) {
    this.lightPool = new ObjectsPool<LightEnemy>({
      game,
      maxItems: 20,
      entityClass: LightEnemy,
    });

    this.regularPool = new ObjectsPool<RegularEnemy>({
      game,
      maxItems: 20,
      entityClass: RegularEnemy,
    });

    this.mediumPool = new ObjectsPool<MediumEnemy>({
      game,
      maxItems: 20,
      entityClass: MediumEnemy,
    });

    this.heavyPool = new ObjectsPool<HeavyEnemy>({
      game,
      maxItems: 20,
      entityClass: HeavyEnemy,
    });
  }

  public getEnemy(type: EnemyType): LightEnemy | RegularEnemy | MediumEnemy | HeavyEnemy | null {
    switch (type) {
      case "light":
        return this.lightPool.getObject();

      case "regular":
        return this.regularPool.getObject();

      case "medium":
        return this.mediumPool.getObject();

      case "heavy":
        return this.heavyPool.getObject();

      default:
        throw new Error("Unknown enemy type");
    }
  }

  public update() {
    this.lightPool.update();
    this.regularPool.update();
    this.mediumPool.update();
    this.heavyPool.update();
  }

  public render() {
    this.lightPool.render();
    this.regularPool.render();
    this.mediumPool.render();
    this.heavyPool.render();
  }

  public forEachInGame(cb: (enemy: Enemy) => void) {
    this.lightPool.forEachInGame(cb);
    this.regularPool.forEachInGame(cb);
    this.mediumPool.forEachInGame(cb);
    this.heavyPool.forEachInGame(cb);
  }

  public findInGame(cb: (enemy: Enemy) => boolean): Enemy | undefined {
    const enemies = [
      ...this.lightPool.pool,
      ...this.regularPool.pool,
      ...this.mediumPool.pool,
      ...this.heavyPool.pool,
    ] as Enemy[];

    return enemies.find((enemy) => enemy.isInGame && cb(enemy));
  }

  public getAll(): Enemy[] {
    return [
      ...this.lightPool.pool,
      ...this.regularPool.pool,
      ...this.mediumPool.pool,
      ...this.heavyPool.pool,
    ] as Enemy[];
  }

  public getRandomEnemy(): Enemy {
    const random = Math.random() * 100;
    let enemy = this.getEnemy("light");

    if (random < 10) {
      enemy = this.getEnemy("heavy");
    } else if (random < 40) {
      enemy = this.getEnemy("medium");
    } else if (random < 50) {
      enemy = this.getEnemy("regular");
    }

    return enemy as Enemy;
  }
}
