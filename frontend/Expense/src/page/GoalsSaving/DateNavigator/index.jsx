import { useState, useRef } from "react";
import { DatePicker } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function DateNavigator({ date, onChange }) {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const dateRef = useRef(null);

  const handlePrevDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    onChange(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    onChange(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      onChange(selectedDate.toDate());
    }
    setOpenDatePicker(false);
  };

  return (
    <div className="date-navigator relative">
      <button className="nav-button" onClick={handlePrevDate}>
        <LeftOutlined className="nav-arrow" />
      </button>

      <span
        className="selected-date"
        onClick={() => setOpenDatePicker(true)}
        ref={dateRef}
      >
        {formatDate(date)}
      </span>

      <button className="nav-button" onClick={handleNextDate}>
        <RightOutlined className="nav-arrow" />
      </button>

      <DatePicker
        open={openDatePicker}
        onOpenChange={setOpenDatePicker}
        value={dayjs(date)}
        onChange={handleDateChange}
        format="DD/MM/YYYY"
        style={{ position: "absolute", opacity: 0 }}
        getPopupContainer={() => dateRef.current}
        dropdownAlign={{ offset: [0, 4] }}
        popupClassName="date-picker-centered"
        onBlur={() => setOpenDatePicker(false)}
      />
    </div>
  );
}

export default DateNavigator;
