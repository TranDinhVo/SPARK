import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteTransaction } from "../../../services/TransactionService";

function DeleteTransaction(props) {
  const { record, onReload } = props;
  const handleDetele = async () => {
    const response = await deleteTransaction(record.id);
    if (response) {
      onReload();
      alert("Xoá bản ghi thành công!");
    } else alert("Xoá bản ghi không thành công!");
  };
  return (
    <>
      <Popconfirm title="" onConfirm={handleDetele}>
        <Button danger size="small" icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  );
}
export default DeleteTransaction;
