export type APIResponse<T> = {
  status: "success" | "error";
  data: T;
};
