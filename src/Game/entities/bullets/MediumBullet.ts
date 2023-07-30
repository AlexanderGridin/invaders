import { Game } from "Game/Game";
import { Bullet } from "./Bullet";

export class MediumBullet extends Bullet {
	protected maxWidth = 12;
	public damage = 5;

	constructor(game: Game) {
		super(game);

		this.initAsset("medium-bullet");
		this.initSize();
	}
}
