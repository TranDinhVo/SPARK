import { get, post, del, patch } from "../utils/request";

export const getBudget = async () => {
  const result = await get("budgets");
  return result;
};

export const createBudget = async (option) => {
  const result = await post("budgets", option);
  return result;
};

export const deleteBudget = async (id) => {
  const result = await del(`budgets/${id}`);
  return result;
};
export const updateBudget = async (id, options) => {
  const result = await patch(`budgets/${id}`, options);
  return result;
};
