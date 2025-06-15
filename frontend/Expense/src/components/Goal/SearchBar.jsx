import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../../assets/scss/SearchBar.scss";

const SearchBar = (props) => {
  const { value, onChange } = props;
  return (
    <Input
      prefix={<SearchOutlined />}
      placeholder="Tìm kiếm ở đây"
      className="search-input"
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      allowClear
    />
  );
}

export default SearchBar;
