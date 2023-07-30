export const defineScale = (targetSize: number, currentSize: number): number => {
  return Number((targetSize / currentSize).toFixed(2));
};
