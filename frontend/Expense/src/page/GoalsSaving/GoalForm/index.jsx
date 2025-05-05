import { useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DateNavigator from "../../../components/DateNavigator";
import Swal from "sweetalert2";
import iconList from "../../../assets/images/iconList";

function GoalForm({ userId, onSave, savingList }) {
  const [savingName, setSavingName] = useState("");
  const [savingAmountInput, setSavingAmountInput] = useState("");
  const [savingDate, setSavingDate] = useState(new Date());
  const [selectedIcon, setSelectedIcon] = useState(
    iconList.length > 0 ? iconList[0] : null
  );

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

    if (!selectedIcon) {
      Swal.fire({
        icon: "error",
        title: "Thiếu biểu tượng",
        text: "Vui lòng chọn một biểu tượng!",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
      });
      return false;
    }

    const check = savingList.filter((saving) => saving.goalName === savingName);
    if (check.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Tên tiết kiệm đã được sử dụng",
        text: "Vui lòng nhập tên tiết kiệm khác!",
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
      iconUrl: selectedIcon?.svg || "",
      userId,
    };

    onSave(saveData);

    setSavingName("");
    setSavingAmountInput("");
    setSavingDate(new Date());
    setSelectedIcon(iconList.length > 0 ? iconList[0] : null);
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
          <div className="flex-1">
            <Input
              value={savingName}
              onChange={(e) => setSavingName(e.target.value)}
              placeholder="Nhập tên tiết kiệm"
            />
          </div>
        </div>

        <div className="goal__form-group">
          <span className="label">Khoản tiền để ra</span>
          <div className="amount-input-container flex-1">
            <Input
              value={Number(savingAmountInput || 0).toLocaleString("vi-VN")}
              onChange={handleAmountChange}
              placeholder="0"
            />
            <span className="currency">VND</span>
          </div>
        </div>

        <div className="goal__form-group">
          <span className="label">Chọn biểu tượng</span>
          <div className="selected-icon-list flex-1">
            <div className="selected-icon-box">
              {selectedIcon && (
                <div
                  className="selected-icon-preview"
                  dangerouslySetInnerHTML={{ __html: selectedIcon.svg }}
                />
              )}
            </div>
            <div className="icon-selector">
              {iconList && iconList.length > 0 ? (
                iconList.map((icon, index) => (
                  <div
                    key={index}
                    className={`icon-item ${
                      selectedIcon?.name === icon.name ? "selected" : ""
                    }`}
                    onClick={() => setSelectedIcon(icon)}
                    dangerouslySetInnerHTML={{ __html: icon.svg }}
                  />
                ))
              ) : (
                <div>Không có biểu tượng nào</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GoalForm;
