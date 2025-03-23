import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { deleteTransaction } from "../../../services/TransactionService";

function DeleteTransaction(props) {
  const { record, onReload } = props;
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xoá?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xoá ngay",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      const response = await deleteTransaction(record.id);
      response
        ? Swal.fire("Xóa thành công!", "Bản ghi đã được xoá.", "success").then(
            onReload
          )
        : Swal.fire("Lỗi!", "Xoá bản ghi không thành công.", "error");
    }
  };

  return (
    <Button
      danger
      size="small"
      icon={<DeleteOutlined />}
      onClick={handleDelete}
    />
  );
}

export default DeleteTransaction;
