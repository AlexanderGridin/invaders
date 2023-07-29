import { useLayoutEffect, useRef } from "react";
import { Game } from "Game";

import styles from "./GameCanvas.module.css";
import { assetsToLoad } from "./assetsToLoad";

interface GameCanvasProps {
	width: number;
	height: number;
}

export const GameCanvas = ({ width, height }: GameCanvasProps) => {
	const ref = useRef<HTMLCanvasElement>(null);
	const gameRef = useRef<Game | null>(null);
	const isInitRef = useRef(false);

	const initGame = async () => {
		const game = new Game(ref.current);
		gameRef.current = game;

		try {
			await game.loadAssets(assetsToLoad);
		} catch (e) {
			const error = e as Error;
			throw new Error(error.message);
		}

		game.init();
		game.start();
	};

	useLayoutEffect(() => {
		if (isInitRef.current) return;

		initGame();

		isInitRef.current = true;
	}, []);

	return (
		<canvas
			ref={ref}
			className={styles.canvas}
			width={width}
			height={height}
		></canvas>
	);
};
