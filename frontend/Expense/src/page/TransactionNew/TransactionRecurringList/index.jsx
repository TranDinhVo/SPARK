import React from "react";
import { Spin, Button, Tag } from "antd";
import {
  DeleteOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import HighlightText from "../../../components/HighlightText";
import "./TransactionRecurringList.scss";

function TransactionRecurringList(props) {
  const { list, loading, selectedId, onSelect, onDelete, search } = props;

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    const confirm = await Swal.fire({
      title: "Xóa giao dịch định kỳ?",
      text: `Bạn chắc chắn muốn xóa \"${item.name}\"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Xóa",
      cancelText: "Hủy",
      reverseButtons: true,
    });
    if (confirm.isConfirmed) {
      onDelete(item);
    }
  };
  const getTypeIcon = (type) => {
    switch (type) {
      case "Tháng":
        return <CalendarOutlined />;
      case "Tuần":
        return <SyncOutlined />;
      case "Quý":
        return <StarOutlined />;
      case "Năm":
        return <ClockCircleOutlined />;
      default:
        return <CalendarOutlined />;
    }
  };

  return (
    <div className="recurring-list__wrapper">
      {loading ? (
        <div className="recurring-list__loading">
          <Spin tip="Đang tải dữ liệu..." size="large" />
        </div>
      ) : list.length === 0 ? (
        <div className="recurring-list__empty">
          Không có giao dịch định kỳ nào.
        </div>
      ) : (
        list.map((item) => (
          <div
            key={item.id}
            className={`recurring-list__item${
              selectedId === item.id ? " recurring-list__item--active" : ""
            }`}
            onClick={() => onSelect(item)}
          >
            <div className="recurring-list__name">
              <HighlightText text={item.name} keyword={search} />
            </div>
            <div className="recurring-list__type-status">
              <span>
                {getTypeIcon(item.type)} {item.type}
              </span>
              <Tag color={item.status?.code === 1 ? "green" : "red"}>
                {item.status?.lable}
              </Tag>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionRecurringList;
