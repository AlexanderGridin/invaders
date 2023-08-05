import { Renderable } from "Game/core";
import { Game } from "Game/Game";
import { GridCell } from "./GridCell";

interface GridConfig {
  game: Game;
  totalRows: number;
  totalColumns: number;
  cellSize: number;
}

export class Grid implements Renderable {
  public x = 0;
  public y = 0;

  public width = 0;
  public height = 0;

  public cells: GridCell[] = [];

  private game: Game;
  private config: Omit<GridConfig, "game">;
  private posCorrection = 0;

  constructor({ game, ...config }: GridConfig) {
    this.game = game;
    this.config = config;

    this.width = this.config.totalColumns * this.config.cellSize;
    this.height = this.config.totalRows * this.config.cellSize;

    this.posCorrection = (this.width - this.game.renderer.canvasWidth) / 2;

    if (this.posCorrection > 0) {
      this.config.totalColumns = this.config.totalColumns - 1;
      this.width = this.config.totalColumns * this.config.cellSize;
    }

    this.posCorrection = (this.width - this.game.renderer.canvasWidth) / 2;
    this.x = 0 - this.posCorrection;

    this.initCells();
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

  public update() {}

  public render() {
    this.cells.forEach((cell) => {
      cell.render();
    });
  }
}
