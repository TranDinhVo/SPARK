import { get, post, del, patch } from "../utils/request";

export const getBorrow = async () => {
  const result = await get("borrowings");
  return result;
};

export const getBorrowByUser = async (id) => {
  const result = await get(`borrowings/user/${id}`);
  return result;
};
export const getBorrowById = async (id) => {
  const result = await get(`borrowings/${id}`);
  return result;
};
export const createBorrow = async (option) => {
  const result = await post("borrowings", option);
  return result;
};

export const deleteBorrow = async (id) => {
  const result = await del(`borrowings/${id}`);
  return result;
};
export const updateBorrow = async (id, options) => {
  const result = await patch(`borrowings/${id}`, options);
  return result;
};
