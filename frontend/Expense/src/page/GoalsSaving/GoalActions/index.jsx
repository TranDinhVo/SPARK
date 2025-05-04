import { Button } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";

function GoalActions({ record, onView, onEdit, onDelete }) {
  return (
    <div className="goal__actions">
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => onView(record)}
      />
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => onEdit(record)}
      />
      <Button
        type="text"
        icon={<DeleteOutlined />}
        danger
        onClick={() => onDelete(record)}
      />
      {/* <Button type="text" icon={<MoreOutlined />} /> */}
    </div>
  );
}

export default GoalActions;
