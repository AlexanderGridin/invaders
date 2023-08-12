import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { checkRectanglesSimpleCollision } from "Game/core/collision-detection";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { ObjectsPoolEntity } from "Game/modules/ObjectsPool/ObjectsPoolEntity";
import { defineScale, generateId } from "Game/utils";
import { Bullet } from "../bullets/Bullet";
import { HealthBar } from "../HealthBar";

interface EnemyConfig {
  game: Game;
  lives: number;
  speed: number;
}

export class Enemy extends ObjectsPoolEntity {
  public id = generateId();
  public lives = 0;
  public speed = 0;
  public inGameNumber: number | null = null;

  private asset!: ImgAsset;

  private healthBar!: HealthBar;

  private isSlowDown = false;
  private slowDownTime = 0;

  private initialSpeed = 0;
  private initialLives = 0;

  constructor({ game, lives, speed }: EnemyConfig) {
    super({
      game,
    });

    this.lives = lives;
    this.initialLives = lives;

    this.initialSpeed = speed;
    this.speed = this.initialSpeed;

    this.healthBar = new HealthBar({
      game,
      entity: this,
      offsetXMultip: 0.3,
      offsetYMultip: 0.03,
      color: "red",
    });
  }

  public initAsset(assetName: AssetName) {
    const asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>(assetName);
    if (!asset) return;
    this.asset = asset;
  }

  public initSize() {
    this.scale = defineScale(120, this.asset.width);
    this.width = this.asset.width * this.scale;
    this.height = this.asset.height * this.scale;
  }

  public update() {
    if (!this.isInGame) return;

    this.moveDown();

    // const isHitPlayer =
    //   this.y >= this.game.renderer.canvasHeight - this.height ||
    //   checkRectanglesSimpleCollision({ a: this, b: this.game.playerOLD });

    // if (isHitPlayer) {
    //   this.game.playerOLD.takeDamage();
    //   this.pullFromGame();
    // }

    this.game.bulletsManager.forEachInGame(this.handleBulletCollision.bind(this));

    this.handleSlowDown();
    this.handleEnemyCollision();

    this.healthBar.update();
  }

  private moveDown() {
    this.y += this.speed;
  }

  private handleEnemyCollision() {
    const enemies = this.game.enemiesManager.getAll();

    for (let i = 0; i < enemies.length; i++) {
      const poolEnemy = enemies[i];

      const hasLowerPosition = (this.inGameNumber ?? 0) < (poolEnemy.inGameNumber ?? 0);
      const isInSameCell = this.x === poolEnemy.x;
      const isSelf = poolEnemy.id === this.id;

      if (isSelf || !isInSameCell || !poolEnemy.isInGame || hasLowerPosition) {
        if (!this.isSlowDown) {
          this.speed = this.initialSpeed;
        }

        continue;
      }

      const isFasterThanLower = poolEnemy.speed <= this.speed;
      const willHaveCollisionWithLower = checkRectanglesSimpleCollision({ a: this, b: poolEnemy, speedY: 35 });

      if (isFasterThanLower && willHaveCollisionWithLower) {
        this.speed = poolEnemy.speed;
        break;
      }
    }
  }

  private handleSlowDown() {
    if (!this.isSlowDown) return;

    this.slowDownTime += this.game.deltaTime;

    if (this.slowDownTime < 1000) return;

    this.isSlowDown = false;
    this.speed = this.initialSpeed;
    this.slowDownTime = 0;
  }

  private handleBulletCollision(bullet: Bullet) {
    // const hasCollision = checkRectanglesSimpleCollision({ a: this, b: bullet });
    // if (!hasCollision) return;
    // this.takeDamage(bullet.damage);
    // this.slowDown();
    // bullet.pullFromGame();
    // if (this.lives > 0) return;
    // this.pullFromGame();
  }

  private slowDown() {
    if (this.isSlowDown) return;

    this.isSlowDown = true;
    this.speed *= 0.5;
  }

  private takeDamage(amount = 1) {
    this.lives -= amount;
  }

  public render() {
    if (!this.isInGame) return;

    this.game.renderer.drawImage({
      asset: this.asset,
      obj: this,
    });

    this.healthBar.render();

    if (this.game.isDebug) {
      this.game.renderer.strokeRect({ obj: this, color: "cyan" });
      this.renderDebugText();
    }
  }

  private renderDebugText() {
    const text = `Speed: ${this.speed} In-game number: ${this.inGameNumber}
		`;
    this.game.renderer.fillText({
      text,
      x: this.x,
      y: this.y,
      color: "violet",
    });

    const posText = `X: ${this.x.toFixed(2)} Y: ${this.y.toFixed(2)}`;
    this.game.renderer.fillText({
      text: posText,
      x: this.x,
      y: this.y - 15,
      color: "violet",
    });
  }

  public pullFromGame() {
    super.pullFromGame();

    this.lives = this.initialLives;
    this.speed = this.initialSpeed;

    this.slowDownTime = 0;
    this.isSlowDown = false;

    this.x = 0;
    this.y = 0;

    this.inGameNumber = null;
  }

  public pushInGame(x: number, y: number, orderInCell?: number) {
    super.pushInGame(x, y);
    this.inGameNumber = orderInCell ?? null;
  }
}
