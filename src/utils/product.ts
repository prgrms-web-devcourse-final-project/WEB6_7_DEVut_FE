export const statusMapping = (status: ItemCondition) => {
  switch (status) {
    case "NEW":
      return "새 상품 (미사용) 미개봉, 사용하지 않은 새 상품";
    case "USED_LIGHT":
      return "사용감 적음 (중고) 눈에 띄는 흔적이나 얼룩이 약간 있음";
    case "USED_HEAVY":
      return "사용감 많음 (중고) 눈에 띄는 흔적이나 얼룩이 많이 있음";
  }
};
