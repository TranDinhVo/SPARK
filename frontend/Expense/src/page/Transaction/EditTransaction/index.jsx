import {
  Button,
  // Modal,
  // Form,
  // Input,
  // InputNumber,
  Select,
  // Switch,
  // notification,
  // Spin,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Option } = Select;

function EditTransaction(props) {
  const { record } = props;

  return (
    <>
      <Button
        type="primary"
        size="small"
        icon={<EditOutlined />}
        //       onClick={handleShowModal}
      />
    </>
  );
}
export default EditTransaction;
