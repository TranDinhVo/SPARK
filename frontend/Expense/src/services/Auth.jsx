import { post } from "../utils/request";

export const loginUser = async (option) => {
  const result = await post("auth/login", option);
  return result;
};

export const registerUser = async (option) => {
  const result = await post("auth/register", option);
  return result;
};
