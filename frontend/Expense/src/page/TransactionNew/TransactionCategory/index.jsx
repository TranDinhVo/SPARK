import { useEffect, useState } from "react";
import "./TransactionCategory.scss";
import { getCategoryByUser } from "../../../services/CategoryService";
import { getCookie } from "../../../helpers/cookie";
import { PlusOutlined } from "@ant-design/icons";

function TransactionCategory(props) {
  const { selectedCategory, onSelectCategory, isExpense } = props;
  const [categories, setCategories] = useState([]);

  const userId = getCookie("id");

  console.log(isExpense);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCategoryByUser(userId);
      const filter = result.filter(
        (item) => item.type === `${isExpense ? "Chi" : "Thu"}`
      );
      setCategories(filter);
    };
    fetchApi();
  }, [isExpense]);
  const handleAdd = () => {
    console.log("Add");
  };
  return (
    <div className="transaction-category--list">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className={`transaction-category--item ${
            selectedCategory === cat.id ? "selected" : ""
          }`}
          onClick={() => onSelectCategory(cat)}
        >
          <div
            className="transaction-category--icon"
            dangerouslySetInnerHTML={{
              __html: cat.iconUrl,
            }}
          ></div>
          <p className="transaction-category--name">{cat.name}</p>
        </div>
      ))}
      <div className="transaction-category__add" onClick={handleAdd}>
        <div className="transaction-category__add--icon">
          <PlusOutlined />
        </div>
        <p className="transaction-category--name">Chỉnh sửa</p>
      </div>
    </div>
  );
}

export default TransactionCategory;
