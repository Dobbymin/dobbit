export const useTabStyle = (isActive: boolean) => {
  return isActive
    ? "border-b-2 border-primary font-semibold text-primary hover:text-primary"
    : "text-white hover:underline hover:underline-offset-2";
};
