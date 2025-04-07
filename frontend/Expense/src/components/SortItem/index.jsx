import { useSearchParams } from "react-router-dom";
import { Button, Dropdown } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

function SortItem() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get("sort") || "";

  const handleSortChange = (order) => {
    if (order === "") {
      searchParams.delete("sort");
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ sort: order });
    }
  };

  const items = [
    { key: "asc", label: "Tăng dần", icon: <SortAscendingOutlined /> },
    { key: "desc", label: "Giảm dần", icon: <SortDescendingOutlined /> },
    { key: "reset", label: "Reset", icon: <ReloadOutlined /> },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => handleSortChange(key === "reset" ? "" : key),
      }}
      trigger={["hover"]}
    >
      <Button
        icon={
          sortOrder === "asc" ? (
            <SortAscendingOutlined />
          ) : sortOrder === "desc" ? (
            <SortDescendingOutlined />
          ) : (
            <SortAscendingOutlined />
          )
        }
        style={{
          fontSize: "20px",
          fontWeight: 600,
          padding: "8px 20px",
          height: "40px",
          width: "50px",
          borderRadius: "8px",
          border: "none",
        }}
      />
    </Dropdown>
  );
}

export default SortItem;
