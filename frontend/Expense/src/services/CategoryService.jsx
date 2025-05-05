import { get, post, del, patch } from "../utils/request";
export const getCategory = async () => {
  const result = await get("categories");
  return result;
};

export const getCategoryByUser = async (id) => {
  const result = await get(`categories/user/${id}`);
  return result;
};
// export const getBudgetById = async (id) => {
//   const result = await get(`categories/${id}`);
//   return result;
// };
export const createCategory = async (option) => {
  const result = await post("categories", option);
  return result;
};

export const deleteCategory = async (id) => {
  const result = await del(`categories/${id}`);
  return result;
};
export const updateCategory = async (id, options) => {
  const result = await patch(`categories/${id}`, options);
  return result;
};
