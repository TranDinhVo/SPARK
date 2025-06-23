import { useState } from "react";
import { DatePicker } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import "./DateNavigator.scss";

dayjs.locale("vi");
const DateNavigator = ({
  date,
  onChange,
  minDate = null, // ngày bắt đầu cho trang tiết kiệm
  maxDate = null, // ngày kết thúc (tùy chọn)
  mode = "transaction", // "transaction" hoặc "savings"
}) =>{
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Xác định chế độ và giới hạn ngày
  const isSavingsMode = mode === "savings";

  // Trong chế độ tiết kiệm, nếu không có minDate thì lấy ngày hiện tại làm minDate
  const effectiveMinDate = isSavingsMode ? minDate || new Date() : null;

  const handlePrevDay = () => {
    const newDate = dayjs(date).subtract(1, "day");

    // Kiểm tra nếu ở chế độ tiết kiệm và có minDate
    if (effectiveMinDate && newDate.isBefore(dayjs(effectiveMinDate), "day")) {
      return;
    }

    onChange(newDate.toDate());
  };

  const handleNextDay = () => {
    // Không cho phép vượt quá maxDate nếu được đặt
    if (maxDate && dayjs(date).isSame(dayjs(maxDate), "day")) {
      return;
    }

    const newDate = dayjs(date).add(1, "day");
    onChange(newDate.toDate());
  };

  const handleDateChange = (newDate) => {
    if (newDate) {
      const currentTime = dayjs(date);
      const updatedDate = newDate
        .hour(currentTime.hour())
        .minute(currentTime.minute())
        .second(currentTime.second());
      onChange(updatedDate.toDate());
      setIsPickerOpen(false); // Đóng DatePicker sau khi chọn ngày
    }
  };

  const formatDisplayDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY HH:mm");
  };

  // Kiểm tra xem nút "Prev" có bị vô hiệu hóa không
  const isPrevButtonDisabled =
    effectiveMinDate && dayjs(date).isSame(dayjs(effectiveMinDate), "day");

  // Kiểm tra xem nút "Next" có bị vô hiệu hóa không
  const isNextButtonDisabled =
    maxDate && dayjs(date).isSame(dayjs(maxDate), "day");

  const disabledDate = (current) => {
    const constraints = [];

    // Đối với trang tiết kiệm: Không cho phép chọn ngày trước ngày hiện tại
    if (isSavingsMode) {
      const today = dayjs().startOf("day");
      constraints.push(current && current < today);
    }
    // Nếu có minDate riêng, áp dụng minDate đó
    else if (minDate) {
      constraints.push(current && current < dayjs(minDate).startOf("day"));
    }

    // Nếu có maxDate, không cho phép chọn ngày sau maxDate
    if (maxDate) {
      constraints.push(current && current > dayjs(maxDate).endOf("day"));
    }

    // Trả về true nếu bất kỳ ràng buộc nào hợp lệ (ngày bị vô hiệu hóa)
    return constraints.some((constraint) => constraint === true);
  };

  return (
    <div className="date-navigator flex-1">
      <button
        className="nav-button"
        onClick={handlePrevDay}
        disabled={isPrevButtonDisabled}
        style={{ opacity: isPrevButtonDisabled ? 0.5 : 1 }}
      >
        <LeftOutlined />
      </button>

      <div className="selected-date" onClick={() => setIsPickerOpen(true)}>
        {formatDisplayDate(date)}
      </div>

      <button
        className="nav-button"
        onClick={handleNextDay}
        disabled={isNextButtonDisabled}
        style={{ opacity: isNextButtonDisabled ? 0.5 : 1 }}
      >
        <RightOutlined />
      </button>

      <DatePicker
        open={isPickerOpen}
        onOpenChange={(open) => setIsPickerOpen(open)}
        value={dayjs(date)}
        onChange={handleDateChange}
        format="DD/MM/YYYY HH:mm"
        showTime={{
          format: "HH:mm",
          defaultValue: dayjs("00:00:00", "HH:mm:ss"),
        }}
        allowClear={false}
        inputReadOnly
        popupStyle={{ zIndex: 1050 }}
        disabledDate={disabledDate}
      />
    </div>
  );
}

export default DateNavigator;
