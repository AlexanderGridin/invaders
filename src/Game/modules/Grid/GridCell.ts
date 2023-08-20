import { Render } from "Game/core/interfaces";
import { GameObject, Position, Size } from "Game/core/models";
import { Game } from "Game/Game";

interface GridCellConfig {
  game: Game;
  position: Position;
  size: Size;
  rowIndex: number;
  columnIndex: number;
}

export class GridCell extends GameObject implements Render {
  private game: Game;

  public rowIndex: number;
  public columnIndex: number;

  constructor({ game, position, size, rowIndex, columnIndex }: GridCellConfig) {
    super({ position, size });

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
    // this.game.renderer.strokeRect({
    //   obj: this,
    //   color: "#BF616A",
    // });
  }
}
