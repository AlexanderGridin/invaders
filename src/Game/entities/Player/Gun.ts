import { AssetName } from "App/components/GameCanvas/assetsToLoad";
import { Render, Update } from "Game/core/interfaces";
import { GameObject, Position, Size } from "Game/core/models";
import { Game } from "Game/Game";
import { ImgAsset } from "Game/modules/AssetsRepository";
import { KeyboardKeyCode } from "Game/modules/Keyboard/enums";
import { Player } from "./Player";

export class Gun extends GameObject implements Update, Render {
  public asset: ImgAsset;

  private game: Game;
  private player: Player;
  private shootingTimer = 0;

  constructor(game: Game, player: Player) {
    const { width, height } = game.config.player.gun;
    super({ size: new Size(width, height) });

    this.game = game;
    this.player = player;
    this.asset = this.game.assetsRepo.getAsset<AssetName, ImgAsset>("t-gun");
  }

  public update() {
    this.shootingTimer += this.game.deltaTime;

    this.updatePosition();
    this.handleKeyboard();
  }

  private updatePosition() {
    const x = this.player.base.position.x + this.player.base.size.width * 0.38 - this.size.width * 0.5;
    const y =
      this.player.base.position.y +
      this.player.base.size.height -
      this.size.height -
      this.player.base.size.height * 0.22;

    this.position.setX(x);
    this.position.setY(y);
  }

  private handleKeyboard() {
    this.handleFKeyPressed();
    this.handleDKeyClicked();
    this.handleSKeyClicked();
  }

  private handleFKeyPressed() {
    if (this.game.keyboard.isKeyPressed(KeyboardKeyCode.F)) {
      this.shootLight();
      return;
    }
  }

  private shootLight() {
    if (!this.isShootingTime) return;

    const bullet = this.game.bulletsManager.getBullet("light");

    if (bullet) {
      const bulletX = this.position.x + this.size.width * 0.5 - bullet.size.width * 0.5;
      bullet.pushInGame(new Position(bulletX, this.position.y));
    }

    this.resetShootingTimer();
  }

  private get isShootingTime(): boolean {
    return this.shootingTimer > this.game.config.player.lightShootTime;
  }

  private resetShootingTimer() {
    this.shootingTimer = 0;
  }

  private handleDKeyClicked() {
    if (!this.game.keyboard.isKeyClicked(KeyboardKeyCode.D)) return;
    this.shootMedium();
  }

  private shootMedium() {
    const bullet = this.game.bulletsManager.getBullet("medium");

    if (bullet) {
      const bulletX = this.position.x + this.size.width * 0.5 - bullet.size.width * 0.5;
      bullet.pushInGame(new Position(bulletX, this.position.y));
    }
  }

  private handleSKeyClicked() {
    if (!this.game.keyboard.isKeyClicked(KeyboardKeyCode.S)) return;
    this.shootHeavy();
  }

  private shootHeavy() {
    const bullet = this.game.bulletsManager.getBullet("heavy");

    if (bullet) {
      const bulletX = this.position.x + this.size.width * 0.5 - bullet.size.width * 0.5;
      bullet.pushInGame(new Position(bulletX, this.position.y));
    }
  }

  public render() {
    this.game.renderer.drawImage({ img: this.asset, position: this.position, size: this.size });

    if (this.game.isDebug) {
      this.game.renderer.strokeRect({ obj: this, color: "red" });
    }
  }
}
