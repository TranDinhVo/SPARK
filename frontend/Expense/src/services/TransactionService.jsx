import { del, get, patch, post } from "../utils/request";
import {
  createRecurringTransaction,
  deleteRecurringTransaction,
  getRecurringTransaction,
} from "./RecurringTransactionService";
import { calculateNextDueDate } from "../helpers/calculateNextDuaDate";
export const getTransaction = async () => {
  const result = await get("/transactions");
  return result;
};
export const createTransaction = async (option) => {
  const result = await post("transactions", option);

  if (option.recurrence) {
    const nextDueDate = calculateNextDueDate(
      option.date,
      option.recurrence.type
    );

    const recurringTransaction = {
      transactionId: result.id,
      recurringType: option.recurrence.type,
      nextDueDate: nextDueDate,
      status: option.recurrence.status
        ? ["DA_HUY", "TAM_DUNG", "DANG_HOAT_DONG"][
            option.recurrence.status.code + 1
          ]
        : "DANG_HOAT_DONG",
    };

    await createRecurringTransaction(recurringTransaction);
  }

  return result;
};
export const deleteTransaction = async (id) => {
  const recurringTransactions = await getRecurringTransaction();

  const recurring = recurringTransactions.find((rt) => rt.transactionId === id);

  if (recurring) {
    await deleteRecurringTransaction(recurring.id);
  }
  const result = await del(`transactions/${id}`);
  return result;
};
export const updateTransaction = async (id, options) => {
  const result = await patch(`transactions/${id}`, options);
  return result;
};
export const deleteAllTransactions = async () => {
  try {
    const transactions = await get("transactions");

    if (!transactions || transactions.length === 0) {
      return { success: true, message: "Không có giao dịch nào để xóa." };
    }

    for (const transaction of transactions) {
      await deleteTransaction(transaction.id);
    }
    return { success: true, message: "Tất cả giao dịch đã được xóa." };
  } catch (error) {
    console.error("Lỗi khi xóa tất cả giao dịch:", error);
    return { success: false, message: "Xóa giao dịch thất bại." };
  }
};
