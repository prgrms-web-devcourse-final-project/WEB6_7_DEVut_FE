export const getBidUnit = (price: number) => {
  if (price < 10_000) return 100;
  if (price < 100_000) return 1_000;
  if (price < 1_000_000) return 5_000;
  return 10_000;
};
