import { get, post, patch, del } from "../utils/request";

export const getRecurringTransaction = async () => {
  const result = await get(`recurring-transactions`);
  return result;
};
export const createRecurringTransaction = async (option) => {
  const result = await post(`recurring-transactions`, option);
  return result;
};
export const updateRecurringTransaction = async (id, options) => {
  const result = await patch(`recurring-transactions/${id}`, options);
  return result;
};

export const deleteRecurringTransaction = async (id) => {
  const result = await del(`recurring-transactions/${id}`);
  return result;
};
