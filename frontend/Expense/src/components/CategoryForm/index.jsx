import { useState, useEffect } from "react";
import { Button, Popover, Input, List } from "antd";
import "../../assets/scss/CategoryForm.scss";

function CategoryForm(props) {
  const { onChange, categories, categoryTypes, value } = props;
  const [visible, setVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("Khoản chi");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = categories.filter((cat) => {
    const typeCate = categoryTypes.find((type) => type.id == cat.typeId);
    return typeCate && typeCate.name === selectedType;
  });

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setVisible(false);
    if (onChange) {
      let typeCat = "";
      if (category.id == 51 || category.id == 52) {
        typeCat = categoryTypes[0].name;
      } else if (category.id == 53 || category.id == 54) {
        typeCat = categoryTypes[1].name;
      } else {
        typeCat = categoryTypes.find((type) => type.id == category.typeId).name;
      }
      onChange({ type: typeCat, name: category.name });
    }
  };

  useEffect(() => {
    if (value) {
      const cate = categories.find((cat) => cat.name === value);
      if (cate) {
        setSelectedCategory(cate);
      }
    }
  }, [value, categories]);
  const content = (
    <div className="category-show">
      <h3 className="category__title">Danh mục</h3>
      <div className="category__menu">
        <div className="category__menu--list">
          {categoryTypes.map((type, index) => (
            <Button
              key={type.name}
              onClick={() => setSelectedType(type.name)}
              className={`category__menu--item + category__menu--active${index} + ${
                selectedType === type.name
                  ? ``
                  : `category__menu--default${index}`
              }`}
            >
              {type.name}
            </Button>
          ))}
        </div>
      </div>

      <List
        className="category__list--main"
        dataSource={filteredCategories}
        renderItem={(category, index) => (
          <List.Item
            onClick={() => handleSelectCategory(category)}
            className={
              "category__list--item " +
              "category__list--color" +
              (category.typeId - 1) +
              (index % 2)
            }
          >
            <span className="category__list--logo">{category.icon}</span>
            <span className="category__list--content">{category.name}</span>
          </List.Item>
        )}
      />
    </div>
  );

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
        value={selectedCategory ? selectedCategory.name : ""}
        style={{ cursor: "pointer", width: "100%" }}
      />
    </Popover>
  );
}

export default CategoryForm;
