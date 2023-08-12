import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { checkRectanglesSimpleCollision } from "Game/core/collision-detection";
import { Position, Size } from "Game/core/models";
import { Velocity } from "Game/core/models/Velocity";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { ObjectsPoolItem } from "Game/modules/ObjectsPool";
import { generateId } from "Game/utils";
import { Bullet } from "../bullets/Bullet";
// import { HealthBar } from "../HealthBar";

interface EnemyConfig {
  game: Game;
  lives: number;
  velocity: Velocity;
  assetName: AssetName;
}

export class Enemy extends ObjectsPoolItem {
  public id = generateId();
  public lives = 0;
  public inGameNumber: number | null = null;

  private asset!: ImgAsset;

  // private healthBar!: HealthBar;

  private isSlowDown = false;
  private slowDownTime = 0;

  private initialLives = 0;

  constructor({ game, lives, velocity, assetName }: EnemyConfig) {
    super(game);

    this.lives = lives;
    this.initialLives = lives;

    this.velocity = velocity;

    const { width, height } = game.config.enemies;
    this.size = new Size(width, height);

    this.initAsset(assetName);

    // this.healthBar = new HealthBar({
    //   game,
    //   entity: this,
    //   offsetXMultip: 0.3,
    //   offsetYMultip: 0.03,
    //   color: "red",
    // });
  }

  private initAsset(assetName: AssetName) {
    const asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>(assetName);
    if (!asset) return;
    this.asset = asset;
  }

  public update() {
    if (!this.isInGame) return;

    this.moveDown();

    const isHitPlayer =
      this.position.y >= this.game.renderer.canvasHeight - this.size.height ||
      checkRectanglesSimpleCollision({ a: this, b: this.game.player.base });

    if (isHitPlayer) {
      console.log("hit player");
      // this.game.player.takeDamage();
      this.pullFromGame();
    }

    this.game.bulletsManager.forEachInGame(this.handleBulletCollision.bind(this));

    this.handleSlowDown();
    this.handleEnemyCollision();

    // this.healthBar.update();
  }

  private moveDown() {
    this.position.increaseY(this.velocity.y);
  }

  private handleEnemyCollision() {
    const enemies = this.game.enemiesManager.getAll();

    for (let poolEnemy of enemies) {
      const hasLowerPosition = (this.inGameNumber ?? 0) < (poolEnemy.inGameNumber ?? 0);
      const isInSameCell = this.position.x === poolEnemy.position.x;
      const isSelf = poolEnemy.id === this.id;

      if (isSelf || !isInSameCell || !poolEnemy.isInGame || hasLowerPosition) {
        if (!this.isSlowDown) {
          this.velocity.reset();
        }

        continue;
      }

      const isFasterThanLower = poolEnemy.velocity.y <= this.velocity.y;
      const willHaveCollisionWithLower = checkRectanglesSimpleCollision({
        a: this,
        b: poolEnemy,
        velocity: new Velocity(0, 35),
      });

      if (isFasterThanLower && willHaveCollisionWithLower) {
        this.velocity.setY(poolEnemy.velocity.y);
        break;
      }
    }
  }

  private handleSlowDown() {
    if (!this.isSlowDown) return;

    this.slowDownTime += this.game.deltaTime;

    if (this.slowDownTime < 1000) return;

    this.isSlowDown = false;
    this.velocity.reset();
    this.slowDownTime = 0;
  }

  private handleBulletCollision(bullet: Bullet) {
    const hasCollision = checkRectanglesSimpleCollision({ a: this, b: bullet });
    if (!hasCollision) return;
    this.takeDamage(bullet.damage);
    this.slowDown();
    bullet.pullFromGame();
    if (this.lives > 0) return;
    this.pullFromGame();
  }

  private slowDown() {
    if (this.isSlowDown) return;

    this.isSlowDown = true;
    this.velocity.setY(this.velocity.y * 0.5);
  }

  private takeDamage(amount = 1) {
    this.lives -= amount;
  }

  public render() {
    if (!this.isInGame) return;

    this.game.renderer.drawImageNew({ img: this.asset, position: this.position, size: this.size });

    // this.healthBar.render();

    if (this.game.isDebug) {
      this.game.renderer.strokeRectNew({ obj: this, color: "cyan" });
      this.renderDebugText();
    }
  }

  private renderDebugText() {
    const text = `Speed: ${this.velocity.y} In-game number: ${this.inGameNumber}
		`;
    this.game.renderer.fillText({
      text,
      x: this.position.x,
      y: this.position.y,
      color: "violet",
    });

    const posText = `X: ${this.position.x} Y: ${this.position.y}`;
    this.game.renderer.fillText({
      text: posText,
      x: this.position.x,
      y: this.position.y - 15,
      color: "violet",
    });
  }

  public pullFromGame() {
    super.pullFromGame();

    this.lives = this.initialLives;
    this.velocity.reset();

    this.slowDownTime = 0;
    this.isSlowDown = false;

    this.position.setX(0);
    this.position.setY(0);

    this.inGameNumber = null;
  }

  public pushInGame(position: Position, orderInCell?: number) {
    super.pushInGame(position);
    this.inGameNumber = orderInCell ?? null;
  }
}
