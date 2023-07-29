import { AssetToLoad } from "Game/modules/AssetsRepository";

export type AssetName =
	| "enemy-car"
	| "player-base"
	| "player-gun"
	| "enemy-light"
	| "enemy-regular"
	| "enemy-medium"
	| "bullet"
	| "enemy-hard";

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
	{
		name: "enemy-light",
		src: "/assets/TLight.png",
	},
	{
		name: "enemy-regular",
		src: "/assets/TRegular.png",
	},
	{
		name: "enemy-medium",
		src: "/assets/TMedium.png",
	},
	{
		name: "enemy-hard",
		src: "/assets/THard.png",
	},
	{
		name: "bullet",
		src: "/assets/Light_Shell.png",
	},
];
