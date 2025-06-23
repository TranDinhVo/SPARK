import { useEffect, useState } from "react";
import "../../page/TransactionNew/TransactionForm/TransactionForm.scss";
import { Input, Select, DatePicker, Switch, Button } from "antd";  
import Swal from "sweetalert2";
import { getCookie } from "../../helpers/cookie";
import { createTransaction } from "../../services/TransactionService";
import "../../assets/scss/createTransactionCalendar.scss";
import dayjs from "dayjs";
import CalendarCategory from "./CalendarCategory";


const CreateTransactionCalendar = (props) => {
    const {date, onReload, handleCloseModal} = props;
    const [isExpense, setIsExpense] = useState(true);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const userId = getCookie("id");
    useEffect(() => {
      handleReset();
    }, [isExpense]);
    const validateForm = async () => {
      if (!selectedCategory) {
        await Swal.fire({
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
      return true;
    };
  
    const handleAmountChange = (e) => {
      const raw = e.target.value.replace(/\D/g, "");
      setAmount(raw);
    };
    const handleReset = () => {
      setDescription("");
      setAmount("");
      setSelectedCategory(null);
    };
    const handleCreate = async () => {
      if (!validateForm()) {
        return;
      }
      const saveData = {
        categoryId: selectedCategory.id,
        amount: Number(amount),
        description,
        createdAt: date.toISOString(),
        userId,
      };
      const result = await createTransaction(saveData);
      if (result) {
          await Swal.fire({
            icon: "success",
            title: "Đã lưu!",
            text: "Giao dịch được tạo thành công 🎯",
            timer: 1500,
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
        
        handleReset();
        handleCloseModal();
        onReload();
      }
    };
    
  const formatDisplayDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY");
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
            <div className="transaction-form__group-date">
              <span className="text-label">Ngày</span>
              <div className="date-navigator flex-1"> 
                <div className="selected-date" >
                    {formatDisplayDate(date)}
               </div>
              </div>
            </div>
  
            <div className="transaction-form__group">
              <span className="label">{isExpense ? "Tiền chi" : "Tiền thu"}</span>
              <div className="amount-input-container flex-1">
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
              <div className="flex-1">
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập ghi chú"
                />
              </div>
            </div>
            <div className="transaction-form__group--category">
              <div className="transaction-form__category">
                <span className="label">Danh mục</span>
                <CalendarCategory
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
export default CreateTransactionCalendar;

