import { get } from "../utils/request";

export const getExpence = async () => {
  const result = await get("/expences");
  return result;
};
