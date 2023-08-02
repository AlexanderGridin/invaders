import { Game } from "Game/Game";
import { ObjectsPool } from "Game/modules/ObjectsPool";
import { HeavyEnemy } from "./HeavyEnemy";
import { LightEnemy } from "./LightEnemy";
import { MediumEnemy } from "./MediumEnemy";
import { RegularEnemy } from "./RegularEnemy";

type EnemyType = "light" | "regular" | "medium" | "heavy";

export class EnemiesManager {
  private lightPool!: ObjectsPool<LightEnemy>;
  private regularPool!: ObjectsPool<RegularEnemy>;
  private mediumPool!: ObjectsPool<MediumEnemy>;
  private heavyPool!: ObjectsPool<HeavyEnemy>;

  constructor(game: Game) {
    this.lightPool = new ObjectsPool<LightEnemy>({
      game,
      limit: 20,
      entityClass: LightEnemy,
    });

    this.regularPool = new ObjectsPool<RegularEnemy>({
      game,
      limit: 20,
      entityClass: RegularEnemy,
    });

    this.mediumPool = new ObjectsPool<MediumEnemy>({
      game,
      limit: 20,
      entityClass: MediumEnemy,
    });

    this.heavyPool = new ObjectsPool<HeavyEnemy>({
      game,
      limit: 20,
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
}
