import { Render, Update } from "Game/core/interfaces";
import { Game } from "Game/Game";
import { ObjectsPoolNEW } from "Game/modules/ObjectsPool";
import { Bullet } from "./Bullet";
import { HeavyBullet } from "./HeavyBullet";
import { LightBullet } from "./LightBullet";
import { MediumBullet } from "./MediumBullet";

type BulletType = "light" | "medium" | "heavy";

export class BulletsManager implements Render, Update {
  private lightBulletsPool!: ObjectsPoolNEW<LightBullet>;
  private mediumBulletsPool!: ObjectsPoolNEW<MediumBullet>;
  private heavyBulletsPool!: ObjectsPoolNEW<HeavyBullet>;

  constructor(game: Game) {
    this.lightBulletsPool = new ObjectsPoolNEW<LightBullet>({
      game,
      maxItems: 30,
      entityClass: LightBullet,
    });
    this.mediumBulletsPool = new ObjectsPoolNEW<MediumBullet>({
      game,
      maxItems: 10,
      entityClass: MediumBullet,
    });
    this.heavyBulletsPool = new ObjectsPoolNEW<HeavyBullet>({
      game,
      maxItems: 10,
      entityClass: HeavyBullet,
    });
  }

  public getBullet(type: BulletType): LightBullet | MediumBullet | HeavyBullet | null {
    switch (type) {
      case "light":
        return this.lightBulletsPool.getObject();

      case "medium":
        return this.mediumBulletsPool.getObject();

      case "heavy":
        return this.heavyBulletsPool.getObject();

      default:
        throw new Error("Unknown bullet type");
    }
  }

  public forEachInGame(cb: (bullet: Bullet) => void) {
    this.lightBulletsPool.forEachInGame(cb);
    this.mediumBulletsPool.forEachInGame(cb);
    this.heavyBulletsPool.forEachInGame(cb);
  }

  public update() {
    this.lightBulletsPool.update();
    this.mediumBulletsPool.update();
    this.heavyBulletsPool.update();
  }

  public render() {
    this.lightBulletsPool.render();
    this.mediumBulletsPool.render();
    this.heavyBulletsPool.render();
  }
}
