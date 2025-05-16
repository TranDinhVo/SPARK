import { useEffect, useState } from "react";
import "./TransactionForm.scss";
import { Input, Select, DatePicker, Switch, Button } from "antd";
import DateNavigator from "../../../components/DateNavigator";
import TransactionCategory from "../TransactionCategory";
import Swal from "sweetalert2";
import { getCookie } from "../../../helpers/cookie";
import { createTransaction } from "../../../services/TransactionService";
import { createRecurringTransaction } from "../../../services/RecurringTransactionService";
import dayjs from "dayjs";

function TransactionForm(props) {
  const { onReload } = props;
  const [isExpense, setIsExpense] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [description, setDescription] = useState("");
  const [savingDate, setSavingDate] = useState(new Date());
  const [amount, setAmount] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const userId = getCookie("id");

  useEffect(() => {
    handleReset();
  }, [isExpense]);
  const validateForm = () => {
    if (!selectedCategory) {
      Swal.fire({
        icon: "error",
        title: "Danh mục",
        text: "Vui lòng chọn danh mục!",
        showClass: {
          popup: "animate__animated animate__headShake",
        },
      });
      return false;
    }
    if (!amount || Number(amount) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Sai số tiền",
        text: "Khoản tiền phải lớn hơn 0!",
        showClass: {
          popup: "animate__animated animate__headShake",
        },
      });
      return false;
    }

    const now = new Date();

    const selectedCreateAt = new Date(savingDate);

    if (!savingDate) {
      Swal.fire({
        icon: "error",
        title: "Ngày không hợp lệ",
        text: "Ngày tạo phải từ hôm nay trở về trước!",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
      });
      return false;
    }

    return true;
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setAmount(raw);
  };
  const handleReset = () => {
    setDescription("");
    setSavingDate(new Date());
    setAmount("");
    setSelectedCategory(null);
  };
  const handleCreate = async () => {
    if (!validateForm()) {
      console.log("loi");
      return;
    }
    const saveData = {
      categoryId: selectedCategory.id,
      amount: Number(amount),
      description,
      createdAt: savingDate.toISOString(),
      userId,
    };
    const result = await createTransaction(saveData);
    if (result) {
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Đã lưu!",
          text: "Giao dịch được tạo thành công 🎯",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "center",
          toast: true,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }, 500);
      handleReset();
      onReload();
    }
  };
  return (
    <>
      <div className="transaction-form">
        <div className="transaction-form__header">
          <div className="transaction-form__header--type"></div>
          <div className="transaction-form__header--btn">
            <div
              className={`transaction-form__header--expense + ${
                isExpense ? "active-tran" : ""
              }`}
              onClick={() => setIsExpense(true)}
            >
              Tiền Chi
            </div>
            <div
              className={`transaction-form__header--income ${
                isExpense ? "" : "active-tran"
              }`}
              onClick={() => setIsExpense(false)}
            >
              Tiền Thu
            </div>
          </div>
        </div>

        <div className="transaction-form__form">
          <div className="transaction-form__group">
            <span className="label">Ngày</span>
            <DateNavigator date={savingDate} onChange={setSavingDate} />
          </div>

          <div className="transaction-form__group">
            <span className="label">{isExpense ? "Tiền chi" : "Tiền thu"}</span>
            <div className="amount-input-container">
              <Input
                value={Number(amount).toLocaleString("vi-VN")}
                onChange={handleAmountChange}
                placeholder="0"
              />
              <span className="currency">VND</span>
            </div>
          </div>
          <div className="transaction-form__group">
            <span className="label">Ghi chú</span>
            <div>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập ghi chú"
              />
            </div>
          </div>
          <div className="transaction-form__group">
            <div className="transaction-form__category">
              <span className="label">Danh mục</span>
              <TransactionCategory
                isExpense={isExpense}
                selectedCategory={selectedCategory?.id}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
              />
            </div>
          </div>

          <div className="transaction-form__group--btn">
            <div
              className="transaction-form__group--reset"
              onClick={handleReset}
            >
              Làm mới
            </div>
            <div
              className="transaction-form__group--create"
              onClick={handleCreate}
            >
              Tạo
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionForm;
