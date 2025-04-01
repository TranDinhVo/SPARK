import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { deleteAllTransactions } from "../../../services/TransactionService";

function ClearAllTransactions({ onReload }) {
  const handleClearAll = async () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa tất cả giao dịch?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteAllTransactions();
        if (response.success) {
          Swal.fire("Thành công!", response.message, "success");
          onReload();
        } else {
          Swal.fire("Lỗi!", response.message, "error");
        }
      }
    });
  };

  return (
    <Button
      icon={<CloseCircleOutlined />}
      onClick={handleClearAll}
      style={{
        fontSize: "18px",
        padding: "8px 20px",
        height: "40px",
        width: "140px",

        borderRadius: "8px",
        border: "none",
      }}
    >
      Clear All
    </Button>
  );
}

export default ClearAllTransactions;
