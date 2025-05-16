import { useState } from "react";
import { Input, Select, DatePicker, Switch, Button } from "antd";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "./RecurringTransactionModelForm.scss";

function RecurringTransactionModelForm({ userId, onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [recurrenceType, setRecurrenceType] = useState("MONTHLY");
  const [nextDueDate, setNextDueDate] = useState(dayjs());
  const [status, setStatus] = useState("ACTIVE");
  const [autoCreateTransaction, setAutoCreateTransaction] = useState(true);

  const handleSubmit = () => {
    if (!name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Tên giao dịch",
        text: "Vui lòng nhập tên giao dịch!",
      });
      return;
    }
    if (!recurrenceType) {
      Swal.fire({
        icon: "error",
        title: "Tần suất",
        text: "Vui lòng chọn tần suất!",
      });
      return;
    }
    if (!nextDueDate) {
      Swal.fire({
        icon: "error",
        title: "Ngày đến hạn",
        text: "Vui lòng chọn ngày đến hạn!",
      });
      return;
    }
    const data = {
      name: name.trim(),
      recurrenceType,
      nextDueDate: nextDueDate.format("YYYY-MM-DD"),
      status,
      autoCreateTransaction,
      userId: Number(userId),
    };
    onSubmit && onSubmit(data);
  };

  return (
    <div className="recurring-transaction-model-form">
      <div className="rtmf__form">
        <div className="rtmf__group">
          <span className="rtmf__label">Tên giao dịch</span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên giao dịch định kỳ"
          />
        </div>
        <div className="rtmf__group-list">
          <div className="rtmf__group">
            <span className="rtmf__label">Tần suất</span>
            <Select
              value={recurrenceType}
              onChange={setRecurrenceType}
              options={[
                { value: "DAILY", label: "Hàng ngày" },
                { value: "WEEKLY", label: "Hàng tuần" },
                { value: "MONTHLY", label: "Hàng tháng" },
                { value: "YEARLY", label: "Hàng năm" },
              ]}
              style={{ width: 180 }}
            />
          </div>
          <div className="rtmf__group">
            <span className="rtmf__label">Ngày giao dịch đầu tiên</span>
            <DatePicker
              value={nextDueDate}
              onChange={setNextDueDate}
              format="DD/MM/YYYY"
              style={{ width: 180 }}
            />
          </div>
        </div>

        {/* <div className="rtmf__group">
          <span className="rtmf__label">Tự động tạo giao dịch</span>
          <Switch
            checked={autoCreateTransaction}
            onChange={setAutoCreateTransaction}
          />
        </div> */}
        <div className="rtmf__btns">
          <Button onClick={onCancel} className="rtmf__btn rtmf__btn--cancel">
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            className="rtmf__btn rtmf__btn--submit"
          >
            Tạo giao dịch định kỳ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecurringTransactionModelForm;
