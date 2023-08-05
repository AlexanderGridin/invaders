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

export class GridCell {
  public x: number;
  public y: number;

  public width: number;
  public height: number;

  private game: Game;

  public rowIndex: number;
  public columnIndex: number;

  constructor({ game, x, y, width, height, rowIndex, columnIndex }: GridCellConfig) {
    this.game = game;

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }

  render() {
    this.game.renderer.strokeRect({
      // TODO: solve ANY
      obj: this as any,
      color: "#BF616A",
    });
  }
}
