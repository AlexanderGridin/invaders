import { GameObjectOLD, Renderable } from "Game/core";
import { Game } from "Game/Game";
import { GridCell } from "./GridCell";

interface GridConfig {
  game: Game;
  totalRows: number;
  totalColumns: number;
  cellSize: number;
}

export class Grid extends GameObjectOLD implements Renderable {
  public cells: GridCell[] = [];

  private game: Game;
  private config: Omit<GridConfig, "game">;
  private positionOffset = 0;

  constructor({ game, ...config }: GridConfig) {
    super({
      width: config.totalColumns * config.cellSize,
      height: config.totalRows * config.cellSize,
    });

    this.game = game;
    this.config = config;

    this.positionOffset = (this.width - this.game.renderer.canvasWidth) / 2;

    if (this.positionOffset > 0) {
      this.correctGrid();
    }

    this.initCells();
  }

  private correctGrid() {
    this.config.totalColumns = this.config.totalColumns - 1;
    this.width = this.config.totalColumns * this.config.cellSize;
    this.positionOffset = (this.width - this.game.renderer.canvasWidth) / 2;
    this.x = 0 - this.positionOffset;
  }

  public initCells() {
    for (let y = 0; y < this.config.totalRows; y++) {
      for (let x = 0; x < this.config.totalColumns; x++) {
        this.cells.push(
          new GridCell({
            game: this.game,
            x: this.x + x * this.config.cellSize,
            y: this.y + y * this.config.cellSize,
            rowIndex: y,
            columnIndex: x,
            width: this.config.cellSize,
            height: this.config.cellSize,
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

  public update() {}
}
