import { useEffect, useState } from "react";
import "../../assets/scss/CategoryListInBudget.scss";
import { getCategoryByUser } from "../../services/CategoryService";
import { getCookie } from "../../helpers/cookie";

function CategoryListInBudget({ selectedCategory, onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const userId = getCookie("id");

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCategoryByUser(userId);
      const filter = result.filter(
        (item) =>
          item.type === "Chi" && item.name?.toLowerCase() !== "tiết kiệm"
      );

      setCategories(filter);
    };
    fetchApi();
  }, []);

  return (
    <div className="category-list">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className={`category-item ${
            String(selectedCategory) === String(cat.id) ? "selected" : ""
          }`}
          onClick={() => onSelectCategory(cat)}
        >
          <div
            className="category-icon"
            dangerouslySetInnerHTML={{
              __html: cat.iconUrl,
            }}
          ></div>
          <p className="category-name">{cat.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryListInBudget;
