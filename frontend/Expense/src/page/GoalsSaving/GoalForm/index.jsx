import { useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DateNavigator from "../../../components/DateNavigator";
import Swal from "sweetalert2";

function GoalForm({ userId, onSave }) {
  const [savingName, setSavingName] = useState("");
  const [savingAmountInput, setSavingAmountInput] = useState("");
  const [savingDate, setSavingDate] = useState(new Date());

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setSavingAmountInput(raw);
  };

  const validateForm = () => {
    if (!savingName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Thiếu tên mục tiêu",
        text: "Vui lòng nhập tên tiết kiệm!",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
      });
      return false;
    }

    if (!savingAmountInput || Number(savingAmountInput) <= 0) {
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
    now.setHours(0, 0, 0, 0);

    const selectedDeadline = new Date(savingDate);
    selectedDeadline.setHours(0, 0, 0, 0);

    if (!savingDate || selectedDeadline < now) {
      Swal.fire({
        icon: "error",
        title: "Ngày không hợp lệ",
        text: "Ngày hoàn thành phải từ hôm nay trở đi!",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
      });
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const saveData = {
      goalName: savingName.trim(),
      targetAmount: Number(savingAmountInput),
      deadline: savingDate.toISOString(),
      userId,
    };

    onSave(saveData);

    // Reset form
    setSavingName("");
    setSavingAmountInput("");
    setSavingDate(new Date());
  };

  return (
    <>
      <div className="goal__header">
        <Button
          type="primary"
          className="goal__create-btn"
          icon={<PlusOutlined />}
          onClick={handleSave}
        >
          Tạo tiết kiệm
        </Button>
      </div>

      <div className="goal__form">
        <div className="goal__form-group">
          <span className="label">Thời gian hoàn thành</span>
          <DateNavigator date={savingDate} onChange={setSavingDate} />
        </div>

        <div className="goal__form-group">
          <span className="label">Tên tiết kiệm</span>
          <div>
            <Input
              value={savingName}
              onChange={(e) => setSavingName(e.target.value)}
              placeholder="Nhập tên tiết kiệm"
            />
          </div>
        </div>

        <div className="goal__form-group">
          <span className="label">Khoản tiền để ra</span>
          <div className="amount-input-container">
            <Input
              value={Number(savingAmountInput).toLocaleString("vi-VN")}
              onChange={handleAmountChange}
              placeholder="0"
            />
            <span className="currency">VND</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default GoalForm;
