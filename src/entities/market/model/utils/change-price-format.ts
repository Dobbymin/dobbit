export const changePriceFormat = (price: number) => {
  if (price > 0) {
    return "▲ " + price.toLocaleString("ko-KR");
  } else if (price < 0) {
    return "▼ " + Math.abs(price).toLocaleString("ko-KR");
  } else {
    return price.toLocaleString("ko-KR");
  }
};
