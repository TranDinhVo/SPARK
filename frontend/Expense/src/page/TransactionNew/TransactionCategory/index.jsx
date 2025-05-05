import { useEffect, useState } from "react";
import "./TransactionCategory.scss";
import {
  getCategoryByUser,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../services/CategoryService";
import { getCookie } from "../../../helpers/cookie";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Button, List, Typography, Form, Input, Select } from "antd";
import Swal from "sweetalert2"; // Import SweetAlert2
import iconList from "../../../assets/images/iconList"; // Điều chỉnh đường dẫn nếu cần

const { Text } = Typography;

function TransactionCategory(props) {
  const { selectedCategory, onSelectCategory, isExpense } = props;
  const [categories, setCategories] = useState([]);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedIcon, setSelectedIcon] = useState(null);

  const userId = getCookie("id");

  useEffect(() => {
    fetchCategories();
  }, [isExpense]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const result = await getCategoryByUser(userId);
      const filter = result.filter(
        (item) => item.type === `${isExpense ? "Chi" : "Thu"}`
      );
      const filtered = isExpense
        ? filter.filter((item) => item.name?.toLowerCase() !== "tiết kiệm")
        : filter;

      setCategories(filtered);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Có lỗi xảy ra khi lấy danh sách danh mục",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setIsEditorVisible(true);
  };

  const closeEditor = () => {
    setIsEditorVisible(false);
  };

  const showAddModal = () => {
    setEditingCategory(null);
    form.resetFields();
    form.setFieldsValue({
      type: isExpense ? "Chi" : "Thu",
    });
    setSelectedIcon(null);
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
    setEditingCategory(null);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      type: category.type,
    });

    const matchingIcon = iconList.find((icon) => icon.svg === category.iconUrl);
    if (matchingIcon) {
      setSelectedIcon(matchingIcon);
    }

    setIsAddModalVisible(true);
  };

  const handleDeleteCategory = async (categoryId, categoryName) => {
    // Use SweetAlert2 for delete confirmation
    Swal.fire({
      title: "Xác nhận xóa",
      text: `Bạn có chắc chắn muốn xóa danh mục "${categoryName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa!",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await deleteCategory(categoryId);

          // Show success message with SweetAlert2
          Swal.fire({
            icon: "success",
            title: "Đã xóa!",
            text: `Danh mục "${categoryName}" đã được xóa thành công`,
            showConfirmButton: false,
            timer: 1500,
          });

          fetchCategories();
        } catch (error) {
          console.error("Error deleting category:", error);
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Có lỗi xảy ra khi xóa danh mục",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (!selectedIcon) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Vui lòng chọn biểu tượng",
        });
        setLoading(false);
        return;
      }

      // Kiểm tra tính duy nhất của tên danh mục
      const categoryType = values.type || (isExpense ? "Chi" : "Thu");
      const isDuplicate = categories.some(
        (cat) =>
          cat.name.toLowerCase() === values.name.toLowerCase() &&
          cat.type === categoryType &&
          (!editingCategory || cat.id !== editingCategory.id)
      );

      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: `Tên danh mục "${values.name}" đã tồn tại trong loại ${categoryType}`,
        });
        setLoading(false);
        return;
      }

      const categoryData = {
        name: values.name,
        type: categoryType,
        iconUrl: selectedIcon.svg,
        userId: userId,
      };

      let result;

      if (editingCategory) {
        // Cập nhật danh mục hiện có
        result = await updateCategory(editingCategory.id, categoryData);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: `Cập nhật danh mục ${values.name} thành công`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        // Tạo danh mục mới
        result = await createCategory(categoryData);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: `Thêm danh mục ${values.name} thành công`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }

      if (result) {
        form.resetFields();
        setSelectedIcon(null);
        closeAddModal();
        fetchCategories();
      }
    } catch (error) {
      const action = editingCategory ? "cập nhật" : "thêm";
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: `Có lỗi xảy ra khi ${action} danh mục`,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

      {/* Modal chỉnh sửa danh mục */}
      <Modal
        title={`Chỉnh sửa danh mục ${isExpense ? "Chi tiêu" : "Thu nhập"}`}
        open={isEditorVisible}
        onCancel={closeEditor}
        footer={[
          <Button
            className="transaction-category__display--add"
            key="add"
            icon={<PlusOutlined />}
            onClick={showAddModal}
          >
            Thêm danh mục mới
          </Button>,
        ]}
        width={700}
        className="transaction-category__display"
      >
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={categories}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEditCategory(item)}
                />,
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteCategory(item.id, item.name)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <div
                    className="category-icon"
                    dangerouslySetInnerHTML={{ __html: item.iconUrl }}
                  />
                }
                title={item.name}
                description={`Loại: ${item.type}`}
              />
            </List.Item>
          )}
        />
      </Modal>

      {/* Modal thêm/sửa danh mục */}
      <Modal
        title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        open={isAddModalVisible}
        onCancel={closeAddModal}
        footer={null}
        destroyOnClose
        width={550}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại danh mục"
            initialValue={isExpense ? "Chi" : "Thu"}
            rules={[{ required: true, message: "Vui lòng chọn loại danh mục" }]}
          >
            <Select placeholder="Chọn loại danh mục">
              <Select.Option value="Chi">Chi</Select.Option>
              <Select.Option value="Thu">Thu</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Biểu tượng"
            rules={[{ required: true, message: "Vui lòng chọn biểu tượng" }]}
          >
            <div className="goal__form-group">
              <div className="selected-icon-list flex-1">
                <div className="selected-icon-box">
                  {selectedIcon && (
                    <div
                      className="selected-icon-preview"
                      dangerouslySetInnerHTML={{ __html: selectedIcon.svg }}
                    />
                  )}
                </div>
                <div className="icon-selector">
                  {iconList && iconList.length > 0 ? (
                    iconList.map((icon, index) => (
                      <div
                        key={index}
                        className={`icon-item ${
                          selectedIcon?.name === icon.name ? "selected" : ""
                        }`}
                        onClick={() => setSelectedIcon(icon)}
                        dangerouslySetInnerHTML={{ __html: icon.svg }}
                      />
                    ))
                  ) : (
                    <div>Không có biểu tượng nào</div>
                  )}
                </div>
              </div>
            </div>
          </Form.Item>

          <Form.Item className="form-actions">
            <Button
              className="transaction-category__display--add"
              htmlType="submit"
              loading={loading}
            >
              {editingCategory ? "Cập nhật" : "Thêm danh mục"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default TransactionCategory;
