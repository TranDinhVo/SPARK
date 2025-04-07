import { useEffect, useState } from "react";
import { Modal, Button, Form, InputNumber, DatePicker } from "antd";
import { PlusOutlined, TagOutlined } from "@ant-design/icons";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { get } from "../../../utils/request";
import CategoryForm from "../../../components/CategoryForm";
import { createBudget } from "../../../services/BudgetService";

dayjs.locale("vi");
const { RangePicker } = DatePicker;
function AddBudget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const fetchApi = async (api) => {
    const result = await get(api);
    return result;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, categoryTypesData] = await Promise.all([
          fetchApi("categories"),
          fetchApi("categoryTypes"),
        ]);
        setCategories(categoriesData);
        setCategoryTypes(categoryTypesData);
      } catch (error) {
        console.error("Lỗi khi fetch API:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (values) => {
    try {
      const { category, amount, dateRange } = values;
      const [start, end] = dateRange;
      const data = {
        category,
        amount,
        startDate: dayjs(start).format("YYYY-MM-DD"),
        endDate: dayjs(end).format("YYYY-MM-DD"),
        createdAt: new Date(),
      };
      const result = await createBudget(data);
      if (result) {
        Swal.fire({
          icon: "success",
          title: "Thêm giao dịch thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.resetFields();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Lỗi khi thêm giao dịch:", error);
      Swal.fire({
        icon: "error",
        title: "Thêm giao dịch thất bại!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Button
        className="button-add"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginLeft: "25px" }}
      >
        Thêm
      </Button>

      <Modal
        title="Thêm giao dịch mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        // width={500}
        centered
      >
        <Form form={form} onFinish={handleSubmit} className="form__budget">
          <Form.Item
            name="category"
            label="Chọn danh mục"
            rules={[{ required: true, message: "Vui lòng chọn tên danh mục!" }]}
          >
            <CategoryForm
              onChange={(category) => {
                if (form) {
                  form.setFieldsValue({
                    type: category.type,
                    category: category.name,
                  });
                }
              }}
              categories={categories}
              categoryTypes={categoryTypes}
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Số tiền giới hạn"
            rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
          >
            <InputNumber
              className="form__card--number"
              min={0}
              style={{ color: "#8836f6" }}
              placeholder="nhập số tiền ..."
            />
          </Form.Item>
          <Form.Item name="dateRange">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button className="form__card--button" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddBudget;
