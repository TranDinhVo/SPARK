import { useEffect, useState } from "react";
import CategoryListInBudget from "../CategoryListInBudget";
import "./BudgetFormModal.scss";
import { getCookie } from "../../../helpers/cookie";
import {
  createBudget,
  getBudgetByUser,
  updateBudget,
} from "../../../services/BudgetService";
import Swal from "sweetalert2";
import { getCategoryByUser } from "../../../services/CategoryService";

function BudgetFormModal(props) {
  const { open, onCancel, onSave, onReload, budgets, editBudget } = props;
  const [amountLimit, setAmountLimit] = useState(0);
  const [alertThreshold, setAlertThreshold] = useState(0.8);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const userId = getCookie("id");

  useEffect(() => {
    const fetchCategories = async () => {
      const userId = getCookie("id");
      const result = await getCategoryByUser(userId);
      const filter = result.filter(
        (item) =>
          item.type === "Chi" && item.name?.toLowerCase() !== "tiết kiệm"
      );
      setCategories(filter);
    };
    if (open) fetchCategories();
  }, [open]);

  useEffect(() => {
    if (editBudget && open && categories.length > 0) {
      const foundCat = categories.find(
        (cat) => String(cat.name) === String(editBudget.budgetName)
      );
      setAmountLimit(editBudget.amountLimit || 0);
      setAlertThreshold(editBudget.alertThreshold || 0.8);
      setSelectedCategory(foundCat || null);
    } else if (open && !editBudget) {
      setAmountLimit(0);
      setAlertThreshold(0.8);
      setSelectedCategory(null);
    }
  }, [editBudget, open, categories]);

  if (!open) return null;

  const handleSave = async () => {
    if (!selectedCategory) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn danh mục.",
      });
      return;
    }
    if (isNaN(amountLimit) || amountLimit <= 0) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Số tiền mục tiêu phải lớn hơn 0.",
      });
      return;
    }
    if (isNaN(alertThreshold) || alertThreshold <= 0 || alertThreshold > 1) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Tỉ lệ cảnh báo phải nằm trong khoảng 0 < x ≤ 1.",
      });
      return;
    }

    if (
      budgets.some(
        (b) =>
          b.budgetName?.toLowerCase().trim() ===
            selectedCategory.name.trim().toLowerCase() &&
          (!editBudget || b.id !== editBudget.id)
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Danh mục đã tồn tại trong ngân sách!",
      });
      return;
    }

    Swal.fire({
      title: editBudget
        ? "Đang cập nhật ngân sách..."
        : "Đang lưu ngân sách...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const startDate = new Date(Date.UTC(currentYear, currentMonth, 1));
    const endDate = new Date(Date.UTC(currentYear, currentMonth + 1, 0));

    const formData = {
      userId: userId,
      amountLimit,
      alertThreshold,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      categoryId: selectedCategory.id,
    };

    setTimeout(() => {
      if (editBudget) {
        const doUpdate = async () => {
          const result = await updateBudget(editBudget.id, formData);
          if (result) {
            Swal.fire({
              icon: "success",
              title: "Thành công",
              text: "Ngân sách đã được cập nhật thành công!",
            });
            onReload();
            onSave(formData);
            handleReset();
          } else {
            Swal.fire({
              icon: "error",
              title: "Thất bại",
              text: "Cập nhật ngân sách thất bại!",
            });
          }
        };
        doUpdate();
      } else {
        onSave(formData);
        const AddBudget = async () => {
          const result = await createBudget(formData);
          if (result) {
            Swal.fire({
              icon: "success",
              title: "Thành công",
              text: "Ngân sách mới đã được thêm thành công!",
            });
            onReload();
            handleReset();
          } else {
            Swal.fire({
              icon: "error",
              title: "Thất bại",
              text: "Ngân sách mới chưa được thêm thành công!",
            });
          }
        };
        AddBudget();
      }
    }, 1000);
  };

  const handleReset = () => {
    setAmountLimit(0);
    setAlertThreshold(0.8);
    setSelectedCategory(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("budget-modal-overlay")) {
      onCancel(); // Nếu click ra ngoài overlay => đóng modal
    }
  };

  return (
    <div className="budget-modal-overlay" onClick={handleBackdropClick}>
      <div className="budget-modal">
        <div className="budget-modal-header">
          <h2>{editBudget ? "Chỉnh sửa danh mục" : "Thêm ngân sách mới"}</h2>
          <button className="budget-modal-close" onClick={onCancel}>
            ×
          </button>
        </div>

        <div className="budget-modal-body">
          <div className="budget-form">
            <div className="budget-input">
              <label>Số tiền mục tiêu</label>
              <input
                type="text"
                value={
                  amountLimit === 0 ? "" : amountLimit.toLocaleString("vi-VN")
                }
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length > 0) {
                    setAmountLimit(Number(value));
                  } else {
                    setAmountLimit(0);
                  }
                }}
                placeholder="Nhập số tiền (VND)"
              />
            </div>

            <div className="budget-input">
              <label>Tỉ lệ cảnh báo</label>
              <input
                type="number"
                step="0.01"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(parseFloat(e.target.value))}
                placeholder="Nhập tỉ lệ cảnh báo (ví dụ: 0.8)"
              />
            </div>

            <div className="budget-category">
              <label>Danh mục</label>
              <CategoryListInBudget
                selectedCategory={selectedCategory?.id}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
              />
            </div>

            <div className="budget-buttons">
              <button className="btn-reset" onClick={handleReset}>
                Làm mới
              </button>
              <button className="btn-save" onClick={handleSave}>
                {editBudget ? "Cập nhật" : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetFormModal;
