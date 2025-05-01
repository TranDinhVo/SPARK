import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchBar({ value, onChange }) {
  return (
    <Input
      prefix={<SearchOutlined />}
      placeholder="Tìm kiếm ở đây"
      className="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
