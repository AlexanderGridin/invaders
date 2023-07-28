enum AssetType {
	Image = "image",
	Audio = "audio",
}

interface AssetConfig {
	name: string;
	type: AssetType;
	element: HTMLElement;
}

class Asset {
	public name: string;
	public type: AssetType;
	public element: HTMLElement;

	constructor({ name, type, element }: AssetConfig) {
		this.name = name;
		this.type = type;
		this.element = element;
	}
}

export class ImgAsset extends Asset {
	public x = 0;
	public y = 0;

	public width = 0;
	public height = 0;
}

export interface AssetToLoad {
	name: string;
	src: string;
}

export class AssetsRepository {
	private containerElement = document.getElementById("assets");
	private repository: Record<string, Asset> = {} as any;
	private loadedAssetsCounter = 0;

	constructor() {
		if (!this.containerElement) {
			throw new Error("Container for assets not found!");
		}
	}

	public loadAssets(assetsToLoad: AssetToLoad[]): Promise<void> {
		return new Promise((resolve) => {
			assetsToLoad.forEach((item) => {
				const srcParts = item.src.split(".");
				const extension = srcParts[srcParts.length - 1];

				switch (extension) {
					case "jpg":
					case "png":
						const img = new Image();
						img.src = item.src;
						this.containerElement?.append(img);

						img.onload = () => {
							this.repository[item.name] = {
								...new ImgAsset({
									name: item.name,
									type: AssetType.Image,
									element: img,
								}),
								width: img.width,
								height: img.height,
							} as ImgAsset;

							this.loadedAssetsCounter++;
							if (this.loadedAssetsCounter === assetsToLoad.length) {
								resolve();
							}
						};

						break;

					default:
						throw new Error("Unknown asset type!");
				}
			});
		});
	}

	getAsset<NameType>(name: NameType) {
		if (typeof name !== "string") {
			throw new Error("Expected value of string type as the asset name");
		}

		const asset = this.repository[name];

		switch (asset.type) {
			case AssetType.Image:
				return asset as ImgAsset;
		}
	}
}
