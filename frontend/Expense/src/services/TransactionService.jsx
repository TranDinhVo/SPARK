import { del, get, patch } from "../utils/request";

export const getTransaction = async () => {
  const result = await get("/transactions");
  return result;
};
export const deleteTransaction = async (id) => {
  const result = await del(`transactions/${id}`);
  return result;
};
export const updateTransaction = async (id, options) => {
  const result = await patch(`transactions/${id}`, options);
  return result;
};
