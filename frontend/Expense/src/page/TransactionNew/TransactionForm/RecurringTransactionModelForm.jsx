import { useEffect, useState } from "react";
import { Input, Select, DatePicker, Form, Button } from "antd";
import Swal from "sweetalert2";
import dayjs from "dayjs";

import "./RecurringTransactionModelForm.scss";
import { getCategoryRecurringTransaction } from "../../../services/RecurringTransactionService";

const RecurringTransactionModelForm = (props) => {
  const { userId, fetchRecurring, setShowRecurringForm, onCancel } = props;
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoryRecurringTransaction(userId);
        setCategories(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const data = {
        ...values,
        nextDueDate: values.nextDueDate.format("YYYY-MM-DD"),
        categoryRecurringTransaction: Number(
          values.categoryRecurringTransaction
        ),
        amount: Number(values.amount),
        userId: Number(userId),
        status: "ACTIVE",
        autoCreateTransaction: true,
      };
      setShowRecurringForm(false);
      fetchRecurring();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="recurring-transaction-model-form">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          recurrenceType: "MONTHLY",
          nextDueDate: dayjs(),
        }}
      >
        <Form.Item
          name="name"
          label="Tên giao dịch"
          rules={[{ required: true, message: "Vui lòng nhập tên giao dịch!" }]}
        >
          <Input placeholder="Nhập tên giao dịch định kỳ" />
        </Form.Item>

        <div className="rtmf__group-list">
          <Form.Item
            name="recurrenceType"
            label="Tần suất"
            rules={[{ required: true, message: "Vui lòng chọn tần suất!" }]}
          >
            <Select
              style={{ width: 180 }}
              options={[
                { value: "DAILY", label: "Hàng ngày" },
                { value: "WEEKLY", label: "Hàng tuần" },
                { value: "MONTHLY", label: "Hàng tháng" },
                { value: "YEARLY", label: "Hàng năm" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="nextDueDate"
            label="Ngày giao dịch đầu tiên"
            rules={[{ required: true, message: "Vui lòng chọn ngày đến hạn!" }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: 180 }} />
          </Form.Item>
        </div>

        <div className="rtmf__group-list">
          <Form.Item
            name="categoryRecurringTransaction"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select
              style={{ width: 180 }}
              placeholder="Chọn danh mục"
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Số tiền"
            rules={[
              { required: true, message: "Vui lòng nhập số tiền!" },
              { type: "number", min: 1, message: "Số tiền phải lớn hơn 0!" },
            ]}
          >
            <Input
              type="number"
              placeholder="Nhập số tiền"
              style={{ width: 180 }}
            />
          </Form.Item>
        </div>

        <div className="rtmf__btns">
          <Button onClick={onCancel} className="rtmf__btn rtmf__btn--cancel">
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="rtmf__btn rtmf__btn--submit"
          >
            Tạo giao dịch định kỳ
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RecurringTransactionModelForm;
