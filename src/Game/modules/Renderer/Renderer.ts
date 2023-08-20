import { GameObject, Position, Size } from "Game/core/models";
import { ImgAsset } from "../AssetsRepository";

export class Renderer {
	private ctx!: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement | null) {
		if (!canvas) {
			throw new Error("Canvas not found during game initialization");
		}

		this.initContext(canvas);
	}

	private initContext(canvas: HTMLCanvasElement): void {
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			throw new Error("Canvas rendering context not found during game initialization!");
		}

		this.ctx = ctx;
	}

	public clear(): void {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	public drawImage({ img, position, size }: { img: ImgAsset; position: Position; size: Size }) {
		this.ctx.drawImage(
			img.element as HTMLImageElement,
			0,
			0,
			size.width,
			size.height,
			position.x,
			position.y,
			size.width,
			size.height
		);
	}

	public strokeRect({ obj, color = "red" }: { obj: GameObject; color?: string }) {
		this.ctx.save();
		this.ctx.strokeStyle = color;
		this.ctx.strokeRect(obj.position.x, obj.position.y, obj.size.width, obj.size.height);
		this.ctx.restore();
	}

	public fillRect({ obj, color = "#000" }: { obj: GameObject; color?: string }) {
		this.ctx.save();
		this.ctx.fillStyle = color;
		this.ctx.fillRect(obj.position.x, obj.position.y, obj.size.width, obj.size.height);
		this.ctx.restore();
	}

	public fillText({ text, x, y, color = "#000" }: { text: string; x: number; y: number; color?: string }) {
		this.ctx.fillStyle = color;
		this.ctx.fillText(text, x, y);
	}

	public get canvasWidth(): number {
		return this.ctx.canvas.width;
	}

	public get canvasHeight(): number {
		return this.ctx.canvas.height;
	}
}
