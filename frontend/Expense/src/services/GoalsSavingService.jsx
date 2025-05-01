import { get, post, del } from "../utils/request";

export const getGoal = async () => {
  const result = await get("goal");
  return result;
};
export const getGoalById = async (id) => {
  const result = await get(`goal/${id}`);
  return result;
};

export const getGoalByUser = async (id) => {
  const result = await get(`goal/user/${id}`);
  return result;
};
export const createGoal = async (option) => {
  const result = await post(`goal`, option);
  return result;
};

export const deleteGoal = async (id) => {
  const result = await del(`goal/${id}`);
  return result;
};
