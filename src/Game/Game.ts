import { Renderable } from "./core";
import { Player } from "./entities";
import { BulletsManager } from "./entities/bullets";
import { EnemiesManager } from "./entities/enemies";
import { AssetsRepository, AssetToLoad } from "./modules/AssetsRepository";
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

    this.enemiesManager.getEnemy("light")?.pushInGame(0, 0);
    this.enemiesManager.getEnemy("regular")?.pushInGame(200, 0);
    this.enemiesManager.getEnemy("medium")?.pushInGame(400, 0);
    this.enemiesManager.getEnemy("heavy")?.pushInGame(600, 0);

    this.isInProgress = true;
    this.renderGameFrame(0);
  }

  public init() {
    this.player = new Player(this);
    this.bulletsManager = new BulletsManager(this);
    this.enemiesManager = new EnemiesManager(this);

    this.renderables = [
      // Bullets
      this.bulletsManager,
      // Enemies
      this.enemiesManager,
      // Player
      this.player,
    ];
  }

  private renderGameFrame(frameTime: number) {
    this.deltaTime = Math.floor(frameTime - this.prevFrameTime);
    this.prevFrameTime = frameTime;

    if (this.isInProgress) {
      this.renderer.clear();

      this.update();
      this.render();
    }

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
  }

  public async loadAssets(assets: AssetToLoad[]) {
    await this.assetsRepo.loadAssets(assets);
  }

  private update() {
    if (this.keyboard.isKeyClicked(KeyboardKeyCode.Q)) {
      this.isDebug = !this.isDebug;
    }

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
}
