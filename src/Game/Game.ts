import { Renderable } from "./core";
import { Player } from "./entities";
import { BulletsManager } from "./entities/bullets";
import { EnemiesManager } from "./entities/enemies";
import { AssetsRepository, AssetToLoad } from "./modules/AssetsRepository";
import { Counter } from "./modules/Counter";
import { Grid } from "./modules/Grid";
import { Keyboard } from "./modules/Keyboard";
import { KeyboardKeyCode } from "./modules/Keyboard/enums";
import { Renderer } from "./modules/Renderer/Renderer";

export class Game {
  public config = {
    enemies: {
      grid: {
        cellSize: 120,
        totalRows: 1,
      },
      spawnEachMs: 500,
    },
  };

  public renderer: Renderer;
  public assetsRepo = new AssetsRepository();

  public keyboard = new Keyboard();

  public player!: Player;

  public bulletsManager!: BulletsManager;
  public enemiesManager!: EnemiesManager;
  private enemiesCounter = new Counter();
  public enemiesGrid!: Grid;
  private renderables: Renderable[] = [];

  private isInProgress = false;
  public isDebug = false;

  private prevFrameTime = 0;
  public deltaTime = 0;

  constructor(canvas: HTMLCanvasElement | null) {
    this.renderer = new Renderer(canvas);
  }

  public start() {
    console.log("Start!!!");
    setInterval(() => {
      console.log("enemy tick");

      if (this.isInProgress) {
        this.spawnEnemy();
      }
    }, this.config.enemies.spawnEachMs);

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

    this.renderables = [
      // Bullets
      this.bulletsManager,
      // Enemies
      this.enemiesManager,
      this.enemiesGrid,
      // Player
      this.player,
    ];
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
    this.player.update();
    this.bulletsManager.update();
    this.enemiesManager.update();
  }

  private render() {
    this.renderables.forEach((renderable) => {
      renderable.render();
    });
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

  private spawnEnemy() {
    const cell = this.getRandomEnemiesGridCell();
    const enemy = this.getRandomEnemy();

    if (!enemy || !cell) {
      return;
    }

    enemy.pushInGame(cell.x, cell.y - enemy.height, this.enemiesCounter.getValue());

    const isOutOfTheGrid = enemy.x < this.enemiesGrid.x || enemy.x + enemy.width > this.enemiesGrid.width;
    if (isOutOfTheGrid) {
      enemy.pullFromGame();
    }

    this.enemiesManager.forEachInGame((poolEnemy) => {
      if (!enemy || poolEnemy.id === enemy.id) return;

      const isInTheSameCell = enemy.x === poolEnemy.x;
      const isCollidesWithLowerOne = enemy.y + enemy.height + 35 >= poolEnemy.y;

      if (isInTheSameCell && isCollidesWithLowerOne) {
        enemy.pullFromGame();
      }
    });
  }

  private getRandomEnemiesGridCell() {
    const randomIndex = Math.round(Math.random() * this.enemiesGrid.cells.length);
    const lastCellIndex = this.enemiesGrid.cells.length - 1;

    const index = randomIndex > lastCellIndex ? lastCellIndex : randomIndex;
    return this.enemiesGrid.cells[index];
  }

  private getRandomEnemy() {
    const random = Math.random() * 100;
    let enemy = this.enemiesManager.getEnemy("light");

    if (random < 10) {
      enemy = this.enemiesManager.getEnemy("heavy");
    } else if (random < 40) {
      enemy = this.enemiesManager.getEnemy("medium");
    } else if (random < 50) {
      enemy = this.enemiesManager.getEnemy("regular");
    }

    return enemy;
  }
}
