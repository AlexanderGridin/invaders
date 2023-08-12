import { AssetToLoad } from "Game/modules/AssetsRepository";

export type AssetName =
  | "enemy-car"
  | "player-base"
  | "player-gun"
  | "enemy-light"
  | "enemy-regular"
  | "enemy-medium"
  | "light-bullet"
  | "medium-bullet"
  | "heavy-bullet"
  | "t-base"
  | "t-gun"
  | "tl"
  | "tm"
  | "tr"
  | "th"
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
    name: "light-bullet",
    src: "/assets/Light_Shell.png",
  },
  {
    name: "medium-bullet",
    src: "/assets/Medium_Shell.png",
  },
  {
    name: "heavy-bullet",
    src: "/assets/Heavy_Shell.png",
  },
  {
    name: "t-base",
    src: "/assets/tbase_size.png",
  },
  {
    name: "t-gun",
    src: "/assets/tgun_size.png",
  },
  {
    name: "tl",
    src: "/assets/TL2.png",
  },
  {
    name: "tr",
    src: "/assets/TR2.png",
  },
  {
    name: "tm",
    src: "/assets/TM2.png",
  },
  {
    name: "th",
    src: "/assets/TH2.png",
  },
];
