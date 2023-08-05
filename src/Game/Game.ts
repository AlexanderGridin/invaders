import { Renderable } from "./core";
import { Player } from "./entities";
import { BulletsManager } from "./entities/bullets";
import { EnemiesManager } from "./entities/enemies";
import { AssetsRepository, AssetToLoad } from "./modules/AssetsRepository";
import { Grid } from "./modules/Grid";
import { Keyboard } from "./modules/Keyboard";
import { KeyboardKeyCode } from "./modules/Keyboard/enums";
import { Renderer } from "./modules/Renderer/Renderer";

export class Game {
  public renderer: Renderer;
  public assetsRepo = new AssetsRepository();

  public keyboard = new Keyboard();

  public player!: Player;

  public bulletsManager!: BulletsManager;
  public enemiesManager!: EnemiesManager;
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
    }, 1000);

    // this.enemiesManager.getEnemy("light")?.pushInGame(0, 0);
    // this.enemiesManager.getEnemy("regular")?.pushInGame(200, 0);
    // this.enemiesManager.getEnemy("medium")?.pushInGame(400, 0);
    // this.enemiesManager.getEnemy("heavy")?.pushInGame(600, 0);

    this.isInProgress = true;
    this.renderGameFrame(0);
  }

  public init() {
    this.player = new Player(this);
    this.bulletsManager = new BulletsManager(this);
    this.enemiesManager = new EnemiesManager(this);

    const cellSize = 120;
    this.enemiesGrid = new Grid({
      game: this,
      totalRows: 1,
      totalColumns: Math.ceil(this.renderer.canvasWidth / cellSize),
      cellSize,
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
    // this.player = new Player(this);
    // this.enemiesPool.reset();
    // this.bulletsPool.reset();

    // this.statistic.score = 0;

    // this.updateScoreUI();
    // this.updateLivesUI();
    // this.updateBulletsUI();

    this.isInProgress = true;
  }

  private spawnEnemy() {
    const randomIndex = Math.round(Math.random() * this.enemiesGrid.cells.length);

    const index = randomIndex > this.enemiesGrid.cells.length - 1 ? this.enemiesGrid.cells.length - 1 : randomIndex;
    const cell = this.enemiesGrid.cells[index];

    const random = Math.random() * 100;
    let enemy = this.enemiesManager.getEnemy("light");

    if (random < 10) {
      enemy = this.enemiesManager.getEnemy("heavy");
    } else if (random < 40) {
      enemy = this.enemiesManager.getEnemy("medium");
    } else if (random < 50) {
      enemy = this.enemiesManager.getEnemy("regular");
    }

    if (!enemy || !cell) {
      return;
    }

    enemy.pushInGame(cell.x, cell.y - enemy.height);

    if (enemy.x < this.enemiesGrid.x || enemy.x + enemy.width > this.enemiesGrid.width) {
      enemy.pullFromGame();
    }

    this.enemiesManager.forEachInGame((poolEnemy) => {
      if (!enemy) return;

      if (poolEnemy.id === enemy.id) {
        return;
      }

      if (enemy.x === poolEnemy.x && enemy.y + enemy.height >= poolEnemy.y) {
        enemy.pullFromGame();
      }
    });
  }
}
