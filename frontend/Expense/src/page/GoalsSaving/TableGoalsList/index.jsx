import { Button, Table } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";

function TableGoalsList(props) {
  const { data, loading, onView, onEdit, onDelete } = props;
  const handleView = (record) => {
    console.log("Xem chi tiết:", record);
  };

  const handleEdit = (record) => {
    console.log("Chỉnh sửa:", record);
  };

  const handleDelete = async (record) => {
    const confirm = await Swal.fire({
      title: "💥 Xóa mục tiêu?",
      html: `
          <div style="font-size:16px">
            Bạn chắc chắn muốn <strong>xóa</strong> mục tiêu
            <span style="color:#f97316; font-weight:bold;">"${record.goalName}"</span>?
          </div>
        `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "🗑️ Xóa",
      cancelButtonText: "❌ Hủy",
      reverseButtons: true,
      customClass: {
        popup: "swal2-popup-custom",
      },
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({
      title: "🔄 Đang xóa mục tiêu...",
      html: `<div style="font-size:14px; color:#6b7280;">Vui lòng đợi trong giây lát.</div>`,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await deleteGoal(record.id);
      Swal.close();

      await Swal.fire({
        title: "🎉 Đã xóa thành công!",
        html: `
            <div style="font-size:15px">
              Mục tiêu <strong style="color:#10b981;">"${record.goalName}"</strong> đã được xóa khỏi danh sách.
            </div>
          `,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-popup-custom",
          timerProgressBar: "swal2-timer-bar",
        },
      });

      fetchSavingGoals();
    } catch (error) {
      console.error("Xóa lỗi:", error);
      Swal.close();

      Swal.fire({
        title: "❌ Xảy ra lỗi!",
        text: "Không thể xóa mục tiêu. Vui lòng thử lại.",
        icon: "error",
        confirmButtonColor: "var(--primary-color)",
      });
    }
  };

  const columns = [
    {
      title: "Tên tiết kiệm",
      dataIndex: "goalName",
      key: "goalName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Mục tiêu",
      dataIndex: "targetAmount",
      key: "targetAmount",
      render: (amount) => (
        <span style={{ color: "var(--primary-color)", fontWeight: "bold" }}>
          {amount?.toLocaleString("vi-VN")} VND
        </span>
      ),
    },
    {
      title: "Ngày đến hạn",
      dataIndex: "deadline",
      key: "deadline",
      render: (date) =>
        new Date(date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status) => {
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
          <Button
            type="default"
            size="small"
            className={`status-tag ${className}`}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="goal__actions">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
    {
      title: "",
      key: "more",
      width: 40,
      render: () => <Button type="text" icon={<MoreOutlined />} />,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      className="saving-table"
      rowKey="id"
    />
  );
}

export default TableGoalsList;
