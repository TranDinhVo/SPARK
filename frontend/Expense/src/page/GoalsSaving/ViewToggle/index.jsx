import { Button } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

function ViewToggle({ viewMode, onToggle }) {
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
