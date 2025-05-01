import { Button } from "antd";

function GoalStatus({ status }) {
  const statusMap = {
    DANG_THUC_HIEN: {
      text: "Đang thực hiện",
      className: "status--active",
    },
    THAT_BAI: { text: "Thất bại", className: "status--failed" },
    TAM_DUNG: { text: "Tạm dừng", className: "status--paused" },
    HOAN_THANH: { text: "Hoàn thành", className: "status--done" },
  };

  const { text, className } = statusMap[status] || {
    text: status,
    className: "",
  };

  return (
    <Button type="default" size="small" className={`status-tag ${className}`}>
      {text}
    </Button>
  );
}

export default GoalStatus;
