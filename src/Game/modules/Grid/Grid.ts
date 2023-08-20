import { Render } from "Game/core/interfaces";
import { GameObject, Position, Size } from "Game/core/models";
import { Game } from "Game/Game";
import { GridCell } from "./GridCell";

interface GridConfig {
	game: Game;
	totalRows: number;
	totalColumns: number;
	cellSize: number;
}

export class Grid extends GameObject implements Render {
	public cells: GridCell[] = [];

	private game: Game;
	private config: Omit<GridConfig, "game">;
	private positionOffset = 0;

	constructor({ game, ...config }: GridConfig) {
		super({
			size: new Size(config.totalColumns * config.cellSize, config.totalRows * config.cellSize)
			// width: config.totalColumns * config.cellSize,
			// height: config.totalRows * config.cellSize,
		});

		this.game = game;
		this.config = config;

		this.positionOffset = (this.size.width - this.game.renderer.canvasWidth) / 2;

		if (this.positionOffset > 0) {
			this.correctGrid();
		}

		this.initCells();
	}

	private correctGrid() {
		this.config.totalColumns = this.config.totalColumns - 1;
		this.size.setWidth(this.config.totalColumns * this.config.cellSize)
		// this.width = this.config.totalColumns * this.config.cellSize;
		this.positionOffset = (this.size.width - this.game.renderer.canvasWidth) / 2;
		this.position.setX(0 - this.positionOffset)
		// this.x = 0 - this.positionOffset;
	}

	public initCells() {
		for (let y = 0; y < this.config.totalRows; y++) {
			for (let x = 0; x < this.config.totalColumns; x++) {
				this.cells.push(
					new GridCell({
						game: this.game,
						position: new Position(this.position.x + x * this.config.cellSize, this.position.y + y * this.config.cellSize),
						size: new Size(this.config.cellSize, this.config.cellSize),
						rowIndex: y,
						columnIndex: x,
					})
				);
			}
		}
	}

	public getRandomCell(): GridCell {
		const randomIndex = Math.round(Math.random() * this.cells.length);
		const lastCellIndex = this.cells.length - 1;

		const index = randomIndex > lastCellIndex ? lastCellIndex : randomIndex;
		return this.cells[index];
	}

	public render() {
		this.cells.forEach((cell) => {
			cell.render();
		});
	}

	public update() { }
}
