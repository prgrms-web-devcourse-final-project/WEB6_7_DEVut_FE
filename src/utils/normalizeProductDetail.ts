interface Wishable {
  isWish: boolean;
}

type ProductDetailUI =
  | (Omit<LiveProductDetail, "isLiked"> & Wishable)
  | (Omit<DelayProductDetail, "isLiked"> & Wishable);

export const normalizeProductDetail = (product: ProductDetail): ProductDetailUI => {
  const { isLiked, ...rest } = product;

  return {
    ...rest,
    isWish: isLiked,
  };
};
