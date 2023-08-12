export const config = {
  player: {
    gun: {
      width: 76,
      height: 159,
    },
    base: {
      width: 181,
      height: 113,
    },
    speed: 5,
    speedBoost: 5,
    lightShootTime: 100,
  },
  enemies: {
    grid: {
      cellSize: 120,
      totalRows: 1,
    },
    spawnEachMs: 1000,
    width: 120,
    height: 199,
  },
  bullets: {
    light: {
      width: 7,
      height: 17,
    },
    medium: {
      width: 12,
      height: 28,
    },
    heavy: {
      width: 15,
      height: 47,
    },
  },
};
