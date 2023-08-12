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
    name: "light-bullet",
    src: "/assets/Light_Shell_size.png",
  },
  {
    name: "medium-bullet",
    src: "/assets/Medium_Shell_size.png",
  },
  {
    name: "heavy-bullet",
    src: "/assets/Heavy_Shell_size.png",
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
