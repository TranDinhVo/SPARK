import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { deleteTransaction } from "../../../services/TransactionService";
import "./DeleteTransaction.scss";

const DeleteTransaction = ({ record, onReLoad }) => {
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: "Giao dịch này sẽ bị xóa vĩnh viễn!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary-color)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            return await deleteTransaction(record.id);
          } catch (error) {
            Swal.showValidationMessage(`Lỗi: ${error.message}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
        customClass: {
          popup: 'animated fadeInDown',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        }
      });

      if (result.isConfirmed) {
        if (result.value) {
          await Swal.fire({
            title: 'Đã xóa!',
            text: 'Giao dịch đã được xóa thành công.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'animated fadeInDown'
            }
          });
          onReLoad();
        } else {
          throw new Error('Xóa không thành công');
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Không thể xóa giao dịch. Vui lòng thử lại!',
        icon: 'error',
        confirmButtonText: 'Đồng ý',
        confirmButtonColor: 'var(--primary-color)',
        customClass: {
          popup: 'animated fadeInDown'
        }
      });
    }
  };

  return (
    <Button
      type="text"
      danger
      icon={<DeleteOutlined />}
      onClick={handleDelete}
      className="delete-transaction-btn"
    />
  );
};

export default DeleteTransaction;
