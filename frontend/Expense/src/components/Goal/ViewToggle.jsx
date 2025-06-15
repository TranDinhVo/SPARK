import { Button } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "../../assets/scss/ViewToggle.scss";
const ViewToggle = (props) => {
  const { viewMode, onToggle } = props;
  return (
    <div className="view-toggles">
      <Button
        type={viewMode === "grid" ? "primary" : "default"}
        icon={<AppstoreOutlined />}
        onClick={() => onToggle("grid")}
      />
      <Button
        type={viewMode === "list" ? "primary" : "default"}
        icon={<UnorderedListOutlined />}
        onClick={() => onToggle("list")}
      />
    </div>
  );
}

export default ViewToggle;
