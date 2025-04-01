import { useEffect, useState } from "react";
import { Button, Modal, Input, DatePicker, Select, Form, Card } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import "./FilterTransaction.scss";
import CategoryForm from "../../../components/CategoryForm/index";
import { get } from "../../../utils/request";

const { RangePicker } = DatePicker;

function FilterTransaction(props) {
  const { onReload } = props;
  const [isFilter, setIsFilter] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);

  const showModalFilter = () => setIsFilter(true);
  const handleCancelFilter = () => {
    form.resetFields();

    setIsFilter(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, categoryTypesData] = await Promise.all([
          get("categories"),
          get("categoryTypes"),
        ]);

        setCategories(categoriesData);
        setCategoryTypes(categoryTypesData);
      } catch (error) {
        console.error("Lỗi khi fetch API:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (values) => {
    console.log("Dữ liệu lọc cho backend:", values);
    form.resetFields();
    setIsFilter(false);
    onReload();
  };

  return (
    <>
      <Button
        icon={<FilterOutlined />}
        onClick={showModalFilter}
        style={{
          fontSize: "18px",
          padding: "8px 20px",
          height: "40px",
          width: "100px",
          borderRadius: "8px",
          marginLeft: "10px",
          border: "none",
        }}
      >
        Filter
      </Button>

      <Modal
        title="Lọc Giao Dịch"
        open={isFilter}
        onCancel={handleCancelFilter}
        footer={null}
        className="filter-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFilter}
          className="filter-container"
        >
          <Card title="Thông tin" className="filter__item">
            <Form.Item name="type" hidden />
            <Form.Item name="category">
              <CategoryForm
                onChange={(category) => {
                  form.setFieldsValue({
                    type: category.type, // Lưu loại danh mục
                    category: category.name, // Lưu tên danh mục
                  });
                }}
                categories={categories}
                categoryTypes={categoryTypes}
              />
            </Form.Item>

            <Form.Item name="amount">
              <Input type="number" placeholder="Nhập số tiền" />
            </Form.Item>

            <Form.Item name="dateRange">
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Card>

          <Card title="Giao dịch định kì" className="filter__item">
            <Form.Item name="status">
              <Select placeholder="Chọn trạng thái">
                <Select.Option value="DANG_HOAT_DONG">
                  Đang Hoạt động
                </Select.Option>
                <Select.Option value="TAM_DUNG">Tạm dừng</Select.Option>
                <Select.Option value="DA_HUY">Đã hủy</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="recurrenceType">
              <Select placeholder="Chọn chu kỳ">
                <Select.Option value="tuan">Hằng tuần</Select.Option>
                <Select.Option value="thang">Hằng tháng</Select.Option>
                <Select.Option value="quy">Hằng quý</Select.Option>
                <Select.Option value="nam">Hằng năm</Select.Option>
              </Select>
            </Form.Item>
          </Card>

          <div className="filter-actions">
            <Button htmlType="submit">Áp dụng</Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default FilterTransaction;
