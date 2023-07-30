import { Renderable } from "./core";
import { Player } from "./entities";
import { HeavyBullet, LightBullet, MediumBullet } from "./entities/bullets";
import { LightEnemy, MediumEnemy, RegularEnemy } from "./entities/enemies";
import { HeavyEnemy } from "./entities/enemies/HeavyEnemy";
import { AssetsRepository, AssetToLoad } from "./modules/AssetsRepository";
import { Keyboard } from "./modules/Keyboard";
import { KeyboardKeyCode } from "./modules/Keyboard/enums";
import { ObjectsPool } from "./modules/ObjectsPool";
import { Renderer } from "./modules/Renderer/Renderer";

export class Game {
	public renderer: Renderer;
	public assetsRepo = new AssetsRepository();

	public keyboard = new Keyboard();

	public player!: Player;

	public lightEnemy!: LightEnemy;
	public regularEnemy!: RegularEnemy;
	public mediumEnemy!: MediumEnemy;
	public heavyEnemy!: HeavyEnemy;

	public lightBulletsPool!: ObjectsPool<LightBullet>;
	public mediumBulletsPool!: ObjectsPool<MediumBullet>;
	public heavyBulletsPool!: ObjectsPool<HeavyBullet>;

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

		this.isInProgress = true;
		this.renderGameFrame(0);
	}

	public init() {
		this.lightEnemy = new LightEnemy(this);
		this.regularEnemy = new RegularEnemy(this);
		this.mediumEnemy = new MediumEnemy(this);
		this.heavyEnemy = new HeavyEnemy(this);

		this.player = new Player(this);

		this.lightBulletsPool = new ObjectsPool<LightBullet>({
			game: this,
			limit: 30,
			entityClass: LightBullet,
		});
		this.mediumBulletsPool = new ObjectsPool<MediumBullet>({
			game: this,
			limit: 10,
			entityClass: MediumBullet,
		});
		this.heavyBulletsPool = new ObjectsPool<HeavyBullet>({
			game: this,
			limit: 10,
			entityClass: HeavyBullet,
		});

		this.renderables = [
			// Enemies
			this.lightEnemy,
			this.regularEnemy,
			this.mediumEnemy,
			this.heavyEnemy,
			// Bullets
			this.lightBulletsPool,
			this.mediumBulletsPool,
			this.heavyBulletsPool,
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

		this.renderables.forEach((renderable) => {
			renderable.update();
		});
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
