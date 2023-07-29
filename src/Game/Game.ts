import { Renderable } from "./core";
import { Bullet, Player } from "./entities";
import { Enemy } from "./entities/Enemy";
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
	public enemy!: Enemy;

	public bulletsPool!: ObjectsPool<Bullet>;

	private renderables: Renderable[] = [];

	private isInProgress = false;
	public isDebug = false;

	private prevFrameTime = 0;
	public deltaTime = 0;

	constructor(canvas: HTMLCanvasElement | null) {
		this.renderer = new Renderer(canvas);
	}

	start() {
		console.log("Start!!!");

		this.isInProgress = true;
		this.renderGameFrame(0);
	}

	public init() {
		this.player = new Player(this);
		this.enemy = new Enemy(this);

		this.bulletsPool = new ObjectsPool<Bullet>({
			game: this,
			limit: 20,
			entityClass: Bullet,
		});

		this.renderables = [this.enemy, this.bulletsPool, this.player];
	}

	renderGameFrame(frameTime: number) {
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

	stop() {
		this.isInProgress = false;
	}

	resume() {
		this.isInProgress = true;
	}

	restart() {
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
