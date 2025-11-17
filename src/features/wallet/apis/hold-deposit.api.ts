export const holdDepositAPI = async () => {
  const response = await fetch("/api/wallet/deposit", { cache: "no-store" });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Hold deposit fetch failed");
  }
  return response.json();
};
