import { KeyboardKeyCode } from "./enums";
import { initKeysRegistry } from "./utils";

export class Keyboard {
	private registry = initKeysRegistry();

	constructor() {
		window.addEventListener("keydown", (e) => {
			const key = e.key as KeyboardKeyCode;

			if (!this.registry[key]) {
				return;
			}

			this.registry[key].isPressed = true;
			this.registry[key].isClicked = true;
		});

		window.addEventListener("keyup", (e) => {
			const key = e.key as KeyboardKeyCode;

			if (!this.registry[key]) {
				return;
			}

			this.registry[key].isPressed = false;
			this.registry[key].prevIsClicked = false;
		});
	}

	public isKeyPressed(key: KeyboardKeyCode): boolean {
		return this.registry[key].isPressed;
	}

	public isKeyClicked(key: KeyboardKeyCode): boolean {
		if (this.registry[key].isClicked && !this.registry[key].prevIsClicked) {
			this.registry[key].prevIsClicked = true;
			return this.registry[key].prevIsClicked;
		}

		this.registry[key].isClicked = false;
		return this.registry[key].isClicked;
	}
}
