import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  DatePicker,
  Select,
  Form,
  Card,
  InputNumber,
  Space,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { get } from "../../../utils/request";
import CategoryForm from "../../../components/CategoryForm/index";

const { RangePicker } = DatePicker;
function FilterBudget(props) {
  const { onReload } = props;
  const [isFilter, setIsFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);

  const [form] = Form.useForm();
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
  const handleReset = () => {
    form.resetFields();
    // onReset && onReset();
  };
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
        className="filter-modal-budget"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFilter}
          className="filter-container"
        >
          <Card title="Thông tin" className="filter__item">
            <Form.Item name="type" hidden />
            <Form.Item name="category" label="Danh mục">
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

            <Form.Item label="Mục tiêu ngân sách">
              <Space>
                <Form.Item name="amountFrom" noStyle>
                  <InputNumber
                    style={{ width: "50%" }}
                    placeholder="Từ"
                    min={0}
                  />
                </Form.Item>

                <Form.Item
                  name="amountTo"
                  noStyle
                  dependencies={["amountFrom"]}
                  shouldUpdate={(prev, curr) =>
                    prev.amountFrom !== curr.amountFrom
                  }
                >
                  <InputNumber
                    style={{ width: "50%" }}
                    placeholder="Đến"
                    min={form.getFieldValue("amountForm") || 0}
                  />
                </Form.Item>
              </Space>
            </Form.Item>

            <Form.Item name="dateRange" label="Thời gian">
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Card>

          <div className="filter-buttons">
            <Button onClick={handleReset} className="reset-btn">
              RESET
            </Button>
            <Button htmlType="submit" type="primary" className="done-btn">
              DONE
            </Button>
          </div>
          <div className="filter-actions">
            <Button htmlType="submit">Áp dụng</Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
export default FilterBudget;
