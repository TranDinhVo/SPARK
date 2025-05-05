import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Switch,
  Card,
  Typography,
  Tooltip,
  message,
} from "antd";
import {
  EditOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  TagOutlined,
  FileTextOutlined,
  CloseOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { getCookie } from "../../../helpers/cookie";
import { getCategoryByUser } from "../../../services/CategoryService";
import { updateTransaction } from "../../../services/TransactionService";
import CategoryForm from "../../../components/CategoryForm";
import "../../../assets/scss/EditTransaction.scss";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const { Text } = Typography;
dayjs.locale("vi");
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return "0 VNĐ";

  if (amount >= 1_000_000_000) {
    const ty = (amount / 1_000_000_000).toFixed(1);
    return `${ty} tỷ VNĐ`;
  } else {
    return amount.toLocaleString("vi-VN") + " VNĐ";
  }
};

function EditTransaction(props) {
  const { record, onReLoad } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isRecurring, setIsRecurring] = useState(
    record.recurrence === null ? false : true
  );
  const isInitiallyRecurring = record.recurrence !== null;
  const [formData, setFormData] = useState(record);
  const [categories, setCategories] = useState([]);
  const userId = getCookie("id");

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    onReLoad();
    setIsModalOpen(false);
  };

  const getStatusLabel = (code) => {
    switch (code) {
      case 1:
        return "Đang hoạt động";
      case 0:
        return "Tạm dừng";
      case -1:
        return "Đã hủy";
      default:
        return "";
    }
  };

  useEffect(() => {
    setIsRecurring(record.recurrence === null ? false : true);
    const fetchApi = async () => {
      try {
        const categoriesData = await getCategoryByUser(userId);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Lỗi khi fetch API:", error);
      }
    };
    fetchApi();

    if (record) {
      form.setFieldsValue({
        name: record.name,
        amount: record.amount,
        description: record.description,
        createdAt: dayjs(record.createdAt),
        type: record.type,
        recurrence: record.recurrence,
      });

      setFormData(record);
    }
  }, [record, form, userId]);

  const handleOnChange = (name, value) => {
    if (name === "createdAt" && value) {
      console.log("Người dùng đã thay đổi ngày:", value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const logBeforeSubmit = (data) => {
    console.log("=====================");
    console.log("Gửi yêu cầu cập nhật:");
    console.log("ID giao dịch:", record.id);
    console.log("Dữ liệu gửi đi:", JSON.stringify(data, null, 2));
    console.log("=====================");
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedTran = {};
      updatedTran.amount = values.amount
        ? parseFloat(values.amount.toString().replace(/,/g, ""))
        : 0;
      updatedTran.description = values.description || "";
      if (values.createdAt) {
        updatedTran.createdAt = values.createdAt
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss[Z]");

        console.log("Ngày đã chọn:", updatedTran.createdAt);
      }

      if (values.name !== record.name) {
        try {
          const categoriesData = await getCategoryByUser(userId);
          const category = categoriesData.find(
            (cat) => cat.name === values.name
          );
          if (category) {
            updatedTran.categoryId = category.id;
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin danh mục:", error);
        }
      }

      if (isInitiallyRecurring && !isRecurring) {
        updatedTran.recurrenceId = -1;
        console.log("Recurrence: " + updatedTran.recurrenceId);
      }

      logBeforeSubmit(updatedTran);

      const result = await updateTransaction(record.id, updatedTran);
      if (result) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật giao dịch thành công!",
          showConfirmButton: false,
          timer: 2000,
        });

        onReLoad();
        setIsModalOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Cập nhật giao dịch thất bại!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật giao dịch:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: error.message || "Không thể cập nhật giao dịch!",
      });
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={showModal}
        size="small"
        style={{
          backgroundColor: "var(--primary-color)",
          borderColor: "var(--primary-color)",
        }}
      />

      <Modal
        title="Chỉnh sửa giao dịch"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="500px"
        centered
        className="custom-modal"
        closeIcon={<CloseOutlined />}
      >
        <Card className="edit-transaction-card">
          <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={{
              name: record.name,
              amount: record.amount,
              description: record.description,
              createdAt: dayjs(record.createdAt),
              type: record.type,
              recurrence: record.recurrence
                ? {
                    type: record.recurrence.type,
                    status: record.recurrence.status,
                    next_date: record.recurrence.next_date,
                  }
                : null,
            }}
            layout="vertical"
            className="edit-transaction-form"
          >
            <div className="edit-transaction-section">
              <Form.Item
                name="name"
                className="detail-form-item"
                rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
              >
                <div className="detail-input-container">
                  <CategoryForm
                    onChange={(category) => {
                      if (form) {
                        form.setFieldsValue({
                          type: category.type,
                          name: category.name,
                        });
                      }
                      setFormData((prev) => ({
                        ...prev,
                        type: category.type,
                        name: category.name,
                      }));
                    }}
                    categories={categories}
                    value={formData.name}
                    className="detail-input"
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="amount"
                className="detail-form-item"
                rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
              >
                <div className="detail-input-container">
                  <InputNumber
                    className="detail-input"
                    min={0}
                    style={{ width: "100%" }}
                    placeholder="Nhập số tiền..."
                    prefix={<DollarCircleOutlined className="detail-icon" />}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    value={formData.amount}
                    onChange={(value) => handleOnChange("amount", value)}
                  />
                </div>
              </Form.Item>

              <Form.Item name="description" className="detail-form-item">
                <div className="textarea-wrapper">
                  <FileTextOutlined className="textarea-icon" />
                  <Input.TextArea
                    className="textarea-with-icon"
                    placeholder="Nhập ghi chú (nếu có)..."
                    rows={2}
                    showCount
                    maxLength={100}
                    value={formData.description || ""}
                    onChange={(e) =>
                      handleOnChange("description", e.target.value)
                    }
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="createdAt"
                className="detail-form-item"
                rules={[{ required: true, message: "Chọn ngày giao dịch!" }]}
              >
                <div className="detail-input-container">
                  <DatePicker
                    prefix={<CalendarOutlined className="detail-icon" />}
                    className="detail-input"
                    format="DD/MM/YYYY HH:mm"
                    showTime={{ format: "HH:mm" }}
                    style={{ width: "100%" }}
                    value={form.getFieldValue("createdAt")}
                    onChange={(date) => {
                      if (date) {
                        console.log(
                          "DatePicker onChange được gọi với:",
                          date.format("DD/MM/YYYY HH:mm")
                        );
                        handleOnChange("createdAt", date);
                        form.setFieldsValue({ createdAt: date });
                      }
                    }}
                    placeholder="Chọn ngày và giờ giao dịch"
                  />
                </div>
              </Form.Item>
            </div>

            {(isInitiallyRecurring || isRecurring) === true && (
              <div className="recurring-section">
                <div className="switch-container">
                  <Text strong className="recurring-title">
                    Giao dịch định kì:
                  </Text>
                  <Switch
                    checked={isRecurring}
                    onChange={(checked) => {
                      setIsRecurring(checked);
                      setFormData((prev) => ({
                        ...prev,
                        recurrence: checked
                          ? prev.recurrence || {
                              type: "",
                              nextDate: null,
                              status: { code: 1, label: "Đang hoạt động" },
                            }
                          : null,
                      }));

                      if (!checked) {
                        form.setFields([
                          { name: ["recurrence", "type"], errors: [] },
                          { name: ["recurrence", "nextDate"], errors: [] },
                          {
                            name: ["recurrence", "status", "code"],
                            errors: [],
                          },
                        ]);
                      }
                    }}
                    className="recurring-switch"
                  />
                </div>
              </div>
            )}

            <Form.Item className="form-buttons">
              <Button type="primary" htmlType="submit" className="save-button">
                Lưu thay đổi
              </Button>
              <Button onClick={handleCancel} className="cancel-button">
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
}

export default EditTransaction;
