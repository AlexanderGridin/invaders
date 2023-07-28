import { Renderable } from "./core";
import { Player } from "./entities";
import { AssetsRepository, AssetToLoad } from "./modules/AssetsRepository";
import { Keyboard } from "./modules/Keyboard";
import { KeyboardKeyCode } from "./modules/Keyboard/enums";
import { Renderer } from "./modules/Renderer/Renderer";

export class Game {
	public renderer: Renderer;
	public assetsRepo = new AssetsRepository();

	public keyboard = new Keyboard();
	public player = new Player(this);

	private renderables: Renderable[] = [this.player];
	private isInProgress = false;

	public isDebug = false;

	constructor(canvas: HTMLCanvasElement | null) {
		this.renderer = new Renderer(canvas);
	}

	start() {
		console.log("Start!!!");

		this.isInProgress = true;
		this.renderGameFrame();
	}

	renderGameFrame() {
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

	public async preload(assets: AssetToLoad[]) {
		await this.assetsRepo.loadAssets(assets);
		this.player.preload();
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
