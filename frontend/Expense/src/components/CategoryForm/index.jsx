import { useState, useEffect } from "react";
import { Button, Popover, Input, List } from "antd";
import { TagOutlined } from "@ant-design/icons";
import "../../assets/scss/CategoryForm.scss";

function CategoryForm(props) {
  const { onChange, categories = [], value } = props;
  const [visible, setVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("Chi");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter categories based on selected type
  const filtered = categories.filter((cat) => cat.type === selectedType);
  const filteredCategories =
    selectedType === "Chi"
      ? filtered.filter((item) => item.name?.toLowerCase() !== "tiết kiệm")
      : filtered;

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setVisible(false);
    if (onChange) {
      onChange(category);
    }
  };
  useEffect(() => {
    if (value && categories.length > 0) {
      const foundCategory = categories.find(
        (cat) =>
          cat.name === value ||
          (typeof value === "object" && cat.name === value.name)
      );

      if (foundCategory) {
        setSelectedCategory(foundCategory);
        setSelectedType(foundCategory.type);
      }
    }
  }, [value, categories]);

  const content = (
    <div className="category-show">
      <h3 className="category__title">Danh mục</h3>
      <div className="category__menu">
        <div className="category__menu--list">
          <Button
            onClick={() => setSelectedType("Chi")}
            className={`category__menu--item ${
              selectedType === "Chi"
                ? "category__menu--active0"
                : "category__menu--default0"
            }`}
          >
            Chi
          </Button>
          <Button
            onClick={() => setSelectedType("Thu")}
            className={`category__menu--item ${
              selectedType === "Thu"
                ? "category__menu--active1"
                : "category__menu--default1"
            }`}
          >
            Thu
          </Button>
        </div>
      </div>

      <List
        className="category__list--main"
        dataSource={filteredCategories}
        renderItem={(category, index) => (
          <List.Item
            onClick={() => handleSelectCategory(category)}
            className={`category__list--item category__list--color-${
              category.type
            }${index % 2}`}
          >
            <span
              className="category__list--logo"
              dangerouslySetInnerHTML={{
                __html: category.iconUrl,
              }}
            ></span>

            <span className="category__list--content">{category.name}</span>
          </List.Item>
        )}
      />
    </div>
  );

  const displayValue = selectedCategory ? selectedCategory.name : "";

  return (
    <Popover
      content={content}
      trigger="click"
      placement="rightTop"
      open={visible}
      onOpenChange={setVisible}
      className="category-popover"
    >
      <Input
        readOnly
        placeholder="Chọn danh mục..."
        value={displayValue}
        style={{ cursor: "pointer", width: "100%" }}
        prefix={<TagOutlined className="detail-icon" />}
      />
    </Popover>
  );
}

export default CategoryForm;
