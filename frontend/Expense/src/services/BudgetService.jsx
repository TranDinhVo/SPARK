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

export const deleteAllBudgets = async () => {
  try {
    const budgets = await get("budgets");

    if (!budgets || budgets.length === 0) {
      return { success: true, message: "Không có ngân sách nào để xóa." };
    }

    for (const budgets of budgets) {
      await deleteBudget(budgets.id);
    }
    return { success: true, message: "Tất cả giao dịch đã được xóa." };
  } catch (error) {
    console.error("Lỗi khi xóa tất cả giao dịch:", error);
    return { success: false, message: "Xóa giao dịch thất bại." };
  }
};
