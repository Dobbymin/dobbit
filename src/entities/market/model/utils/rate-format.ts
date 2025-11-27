export const rateFormat = (rate: number) => {
  if (rate > 0) {
    return "+" + rate.toFixed(2) + "%";
  } else if (rate < 0) {
    return "-" + Math.abs(rate).toFixed(2) + "%";
  } else {
    return rate.toFixed(2) + "%";
  }
};
