import { config } from "./config";
import { Render, Update } from "./core/interfaces";
import { Position } from "./core/models";
import { BulletsManager } from "./entities/bullets";
import { EnemiesManager } from "./entities/enemies";
import { Player } from "./entities/Player";
import { AssetsRepository, AssetToLoad } from "./modules/AssetsRepository";
import { Counter } from "./modules/Counter";
import { Grid } from "./modules/Grid";
import { Keyboard } from "./modules/Keyboard";
import { KeyboardKeyCode } from "./modules/Keyboard/enums";
import { Renderer } from "./modules/Renderer/Renderer";

export class Game {
  public config = config;

  public renderer: Renderer;
  public assetsRepo = new AssetsRepository();

  public keyboard = new Keyboard();

  public player!: Player;

  public bulletsManager!: BulletsManager;
  public enemiesManager!: EnemiesManager;
  private enemiesCounter = new Counter();
  public enemiesGrid!: Grid;
  private gameObjects: (Render | Update)[] = [];

  private isInProgress = false;
  public isDebug = false;

  private prevFrameTime = 0;
  public deltaTime = 0;
  private enemiesSpawnTime = 0;

  constructor(canvas: HTMLCanvasElement | null) {
    this.renderer = new Renderer(canvas);
  }

  public start() {
    console.log("Start!!!");

    this.isInProgress = true;
    this.renderGameFrame(0);
  }

  public init() {
    this.player = new Player(this);

    this.bulletsManager = new BulletsManager(this);
    this.enemiesManager = new EnemiesManager(this);

    this.enemiesGrid = new Grid({
      game: this,
      totalRows: this.config.enemies.grid.totalRows,
      totalColumns: Math.ceil(this.renderer.canvasWidth / this.config.enemies.grid.cellSize),
      cellSize: this.config.enemies.grid.cellSize,
    });

    this.gameObjects = [this.bulletsManager, this.enemiesGrid, this.enemiesManager, this.player];
  }

  private renderGameFrame(frameTime: number) {
    this.deltaTime = Math.floor(frameTime - this.prevFrameTime);
    this.prevFrameTime = frameTime;

    if (this.isInProgress) {
      this.update();
    }

    this.renderer.clear();
    this.render();

    this.handleCommonKeyboardEvents();

    requestAnimationFrame(this.renderGameFrame.bind(this));
  }

  private handleCommonKeyboardEvents(): void {
    if (this.keyboard.isKeyClicked(KeyboardKeyCode.P)) {
      this.isInProgress ? this.stop() : this.resume();
    }

    if (this.keyboard.isKeyClicked(KeyboardKeyCode.R)) {
      this.restart();
    }

    if (this.keyboard.isKeyClicked(KeyboardKeyCode.Q)) {
      this.isDebug = !this.isDebug;
    }
  }

  public async loadAssets(assets: AssetToLoad[]) {
    await this.assetsRepo.loadAssets(assets);
  }

  private update() {
    this.handleSelfUpdate();

    for (let obj of this.gameObjects) {
      if ("update" in obj) {
        obj.update();
      }
    }
  }

  private handleSelfUpdate() {
    this.enemiesSpawnTime += this.deltaTime;

    if (this.enemiesSpawnTime > this.config.enemies.spawnEachMs) {
      console.log("spawnEnemy");

      this.spawnEnemy();
      this.enemiesSpawnTime = 0;
    }
  }

  private spawnEnemy() {
    const cell = this.enemiesGrid.getRandomCell();
    const enemy = this.enemiesManager.getRandomEnemy();

    if (!enemy || !cell) {
      return;
    }

    const position = new Position(cell.x, cell.y - enemy.size.height);
    enemy.pushInGame(position, this.enemiesCounter.getValue());

    const isOutOfTheGrid =
      enemy.position.x < this.enemiesGrid.x || enemy.position.x + enemy.size.width > this.enemiesGrid.width;
    if (isOutOfTheGrid) {
      enemy.pullFromGame();
    }

    this.enemiesManager.forEachInGame((poolEnemy) => {
      if (!enemy || poolEnemy.id === enemy.id) return;

      const isInTheSameCell = enemy.position.x === poolEnemy.position.x;
      const isCollidesWithLowerOne = enemy.position.y + enemy.size.height + 35 >= poolEnemy.position.y;

      if (isInTheSameCell && isCollidesWithLowerOne) {
        enemy.pullFromGame();
      }
    });
  }

  private render() {
    for (let obj of this.gameObjects) {
      if ("render" in obj) {
        obj.render();
      }
    }
  }

  public stop() {
    this.isInProgress = false;
  }

  public resume() {
    this.isInProgress = true;
  }

  public restart() {
    this.isInProgress = true;
  }
}
