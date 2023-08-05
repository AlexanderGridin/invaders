import { GameObject, Renderable } from "Game/core";
import { Game } from "Game/Game";

interface GridCellConfig {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;
  rowIndex: number;
  columnIndex: number;
}

export class GridCell extends GameObject implements Renderable {
  private game: Game;

  public rowIndex: number;
  public columnIndex: number;

  constructor({ game, x, y, width, height, rowIndex, columnIndex }: GridCellConfig) {
    super({ x, y, width, height });

    this.game = game;

    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }

  public render() {
    if (!this.game.isDebug) return;

    this.game.renderer.strokeRect({
      obj: this,
      color: "#BF616A",
    });
  }

  public update() {}
}
