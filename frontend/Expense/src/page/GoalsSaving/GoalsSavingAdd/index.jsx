import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Swal from "sweetalert2";
import "./GoalsSavingAdd.scss";
import { getCookie } from "../../../helpers/cookie";
import { getCategoryByUser } from "../../../services/CategoryService";
import { createTransaction } from "../../../services/TransactionService";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

function GoalsSavingAdd({ savingList, onReload }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [savingGoals, setSavingGoals] = useState([]);
  const [savingCategoryId, setSavingCategoryId] = useState(null);

  const userId = getCookie("id");

  const fetchSavingCategory = async () => {
    try {
      const response = await getCategoryByUser(userId);
      const result = response.find((item) => item.name === "Tiết kiệm");
      if (result) {
        setSavingCategoryId(result.id);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh mục Tiết kiệm:", error);
    }
  };

  useEffect(() => {
    fetchSavingCategory();
  }, [userId]);

  useEffect(() => {
    const savingGoals = Array.isArray(savingList)
      ? savingList
      : savingList
      ? [savingList]
      : [];
    setSavingGoals(savingGoals);
  }, [savingList]);

  const handleAddTransaction = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const formatNumber = (value) => {
    if (!value) return "";
    const onlyNumbers = value.toString().replace(/[^0-9]/g, "");
    return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumber = (value) => {
    return value ? value.replace(/,/g, "") : "";
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const createdAtDate = values.createdAt.clone();

      const transactionData = {
        ...values,
        amount: parseFloat(parseNumber(values.amount)),
        categoryId: savingCategoryId || 1,
        createdAt: createdAtDate.format("YYYY-MM-DDTHH:mm:ss[Z]"),
        userId,
      };

      console.log("Thông tin giao dịch mới:", transactionData);

      const result = await createTransaction(transactionData);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Thêm giao dịch tiết kiệm thành công",
          confirmButtonColor: "#3085d6",
          timer: 1500,
        });

        setIsModalVisible(false);
        form.resetFields();
        onReload();
      }
    } catch (error) {
      console.error("Lỗi khi thêm giao dịch:", error);

      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Không thể thêm giao dịch. Vui lòng thử lại.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleAmountChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatNumber(value);
    form.setFieldsValue({ amount: formattedValue });
  };

  return (
    <>
      <Button
        onClick={handleAddTransaction}
        icon={<PlusOutlined />}
        className="saving-goal__add-btn"
      >
        Thêm giao dịch
      </Button>

      <Modal
        title="Thêm giao dịch tiết kiệm"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        className="saving-goal__modal"
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="saving-goal__form"
          initialValues={{
            goalId: savingGoals.length > 0 ? savingGoals[0].id : undefined,
            createdAt: dayjs().tz("Asia/Ho_Chi_Minh"),
          }}
        >
          <Form.Item
            name="goalId"
            label="Mục tiêu tiết kiệm"
            rules={[
              { required: true, message: "Vui lòng chọn mục tiêu tiết kiệm" },
            ]}
          >
            <Select placeholder="Chọn mục tiêu tiết kiệm">
              {savingGoals.map((goal) => (
                <Select.Option key={goal.id} value={goal.id}>
                  {goal.goalName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Số tiền"
            rules={[
              { required: true, message: "Vui lòng nhập số tiền" },
              {
                validator: (_, value) => {
                  const numValue = parseNumber(value);
                  if (numValue && numValue < 1000) {
                    return Promise.reject(
                      "Số tiền phải lớn hơn hoặc bằng 1,000"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              style={{ textAlign: "right" }}
              placeholder="Nhập số tiền"
              onChange={handleAmountChange}
              suffix="VND"
              maxLength={16}
              inputMode="numeric"
            />
          </Form.Item>

          <Form.Item
            name="createdAt"
            label="Ngày giao dịch"
            rules={[
              { required: true, message: "Vui lòng chọn ngày giao dịch" },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Chọn ngày và giờ"
              format="DD/MM/YYYY HH:mm"
              showTime={{ format: "HH:mm" }}
              allowClear={false}
            />
          </Form.Item>

          <Form.Item name="description" label="Ghi chú">
            <Input.TextArea
              rows={4}
              placeholder="Nhập ghi chú cho giao dịch này"
              maxLength={200}
            />
          </Form.Item>

          <Form.Item className="saving-goal__form-buttons">
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Hủy
            </Button>
            <Button htmlType="submit" loading={loading}>
              Lưu giao dịch
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default GoalsSavingAdd;
