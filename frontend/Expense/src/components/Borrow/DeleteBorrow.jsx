import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteBorrow = (props) => {
  const {handleDelete } = props;

  return (
    <Button
      danger
      size="small"
      icon={<DeleteOutlined />}
      onClick={handleDelete}
    />
  );
}

export default DeleteBorrow;
