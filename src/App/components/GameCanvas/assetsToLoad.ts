import { AssetToLoad } from "Game/modules/AssetsRepository";

export type AssetName = "enemy-car" | "player-base" | "player-gun";

export const assetsToLoad: AssetToLoad[] = [
	{
		name: "enemy-car",
		src: "/assets/enemy-car.png",
	},
	{
		name: "player-base",
		src: "/assets/Hull_06_horis.png",
	},
	{
		name: "player-gun",
		src: "/assets/Gun_01.png",
	},
];
