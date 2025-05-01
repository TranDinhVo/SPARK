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
} from "antd";
import {
  EditOutlined,
  CalendarOutlined,
  DollarOutlined,
  TagOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import "../../../assets/scss/AddTransaction.scss";
import { get } from "../../../utils/request";
import CategoryForm from "../../../components/CategoryForm";
import { updateTransaction } from "../../../services/TransactionService";
dayjs.locale("vi");

function EditTransaction(props) {
  const { record, onReLoad } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isRecurring, setIsRecurring] = useState(
    record.recurrence === null ? false : true
  );
  const [formData, setFormData] = useState(record);
  const [wallets, setWallets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
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
  const fetchApi = async (api) => {
    const result = await get(api);
    return result;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletsData, categoriesData, categoryTypesData] =
          await Promise.all([
            fetchApi("wallets"),
            fetchApi("categories"),
            fetchApi("categoryTypes"),
          ]);

        setWallets(walletsData);
        setCategories(categoriesData);
        setCategoryTypes(categoryTypesData);
      } catch (error) {
        console.error("Lỗi khi fetch API:", error);
      }
    };

    fetchData();
  }, []);
  const handleOnChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const updatedTransaction = {};

      if (values.amount !== record.amount) {
        updatedTransaction.amount = values.amount;
      }

      if (values.note !== record.note) {
        updatedTransaction.note = values.note;
      }

      if (values.date) {
        const dateObj =
          values.date instanceof dayjs
            ? values.date.toDate()
            : new Date(values.date);
        const recordDate = record.date
          ? new Date(record.date).toISOString()
          : null;
        const newDateISO = dateObj.toISOString();

        if (!isNaN(dateObj) && newDateISO !== recordDate) {
          updatedTransaction.date = newDateISO;
        }
      }

      if (values.category !== record.category) {
        updatedTransaction.category = values.category;
      }

      if (values.paymentMethod !== record.paymentMethod) {
        updatedTransaction.paymentMethod = values.paymentMethod;
      }

      if (isRecurring) {
        if (!record.recurrence) {
          updatedTransaction.recurrence = { ...formData.recurrence };
        } else {
          updatedTransaction.recurrence = {
            type: formData.recurrence?.type || record.recurrence.type,
            next_date:
              formData.recurrence?.next_date || record.recurrence.next_date,
            status: formData.recurrence?.status || record.recurrence.status,
          };
        }
      } else if (record.recurrence) {
        updatedTransaction.recurrence = null;
      }

      // Kiểm tra nếu không có thay đổi nào
      if (Object.keys(updatedTransaction).length === 0) {
        Swal.fire({
          icon: "info",
          title: "Không có thay đổi nào!",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      console.log("🚀 Dữ liệu gửi đi:", updatedTransaction);

      const result = await updateTransaction(record.id, updatedTransaction);
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
      console.error("❌ Lỗi khi cập nhật giao dịch:", error);
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
        style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
      ></Button>

      <Modal
        title="Thêm giao dịch mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        // width={500}
        centered
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={record}
          className="form__list"
          name="edit-transaction"
        >
          <Card title="Thông tin" className="form__card">
            <Form.Item name="type" hidden></Form.Item>
            <Form.Item
              name="category"
              rules={[
                { required: true, message: "Vui lòng chọn tên danh mục!" },
              ]}
            >
              <div className="form__card--item">
                <div className="form__card--logo">
                  <TagOutlined />
                </div>
                <div className="form__card--input">
                  <CategoryForm
                    onChange={(category) => {
                      if (form) {
                        form.setFieldsValue({
                          type: category.type, // Lưu loại danh mục
                          category: category.name, // Lưu tên danh mục
                        });
                      }
                      setFormData((prev) => ({
                        ...prev,
                        type: category.type, // Cập nhật type trong state
                        category: category.name, // Cập nhật category trong state
                      }));
                    }}
                    categories={categories}
                    categoryTypes={categoryTypes}
                    value={formData.category}
                  />
                </div>
              </div>
            </Form.Item>

            <Form.Item
              name="amount"
              rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
            >
              <div className="form__card--item">
                <div className="form__card--logo">
                  <DollarOutlined />
                </div>
                <div className="form__card--input">
                  <InputNumber
                    className="form__card--number"
                    min={0}
                    style={{ color: "#8836f6" }}
                    placeholder="nhập số tiền ..."
                    value={formData.amount}
                    onChange={(value) => handleOnChange("amount", value)}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item name="note">
              <div className="form__card--item">
                <div className="form__card--logo">
                  <FileTextOutlined />
                </div>
                <div className="form__card--input">
                  <Input.TextArea
                    className="form__card--textarea"
                    placeholder="Nhập ghi chú (nếu có)..."
                    rows={2}
                    showCount
                    maxLength={100}
                    value={formData.note ? formData.note.toString() : ""}
                    onChange={(e) => handleOnChange("note", e.target.value)}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item
              name="date"
              rules={[{ required: true, message: "Chọn ngày giao dịch!" }]}
              initialValue={dayjs()}
            >
              <div className="form__card--item">
                <div className="form__card--logo">
                  <CalendarOutlined />
                </div>
                <div className="form__card--input">
                  <DatePicker
                    className="form__card--datepicker"
                    showTime
                    format={(value) => value.format("dddd, DD [Tháng] MM YYYY")}
                    value={formData.date ? dayjs(formData.date) : null} // Kiểm tra tránh lỗi
                    onChange={(date) =>
                      handleOnChange("date", date ? date.toISOString() : null)
                    } // Chuyển đổi ngày về ISO string
                  />
                </div>
              </div>
            </Form.Item>
          </Card>

          <div>
            <div className="switch__container">
              <span className="switch__container--title">
                Giao dịch định kì:
              </span>
              <Switch
                checked={isRecurring}
                onChange={(checked) => {
                  setIsRecurring(checked);
                  setFormData((prev) => ({
                    ...prev,
                    recurrence: checked
                      ? {
                          type: "",
                          nextDueDate: null,
                          status: { code: 1, label: "Đang hoạt động" },
                        }
                      : null,
                  }));
                }}
                className="custom-switch"
              />
            </div>

            {isRecurring && (
              <Card className="form__card">
                <Form.Item label="Chu kỳ">
                  <div className="form__card--item">
                    <Select
                      placeholder="Chọn chu kỳ"
                      className="form__card--select"
                      value={formData.recurrence?.type || ""}
                      onChange={(value) => {
                        handleOnChange("recurrence", {
                          ...formData.recurrence,
                          type: value,
                          nextDueDate: null,
                        });
                      }}
                    >
                      <Select.Option value="Hằng tuần">Hằng tuần</Select.Option>
                      <Select.Option value="Hằng tháng">
                        Hằng tháng
                      </Select.Option>
                      <Select.Option value="Hằng quý">Hằng quý</Select.Option>
                      <Select.Option value="Hằng năm">Hằng năm</Select.Option>
                    </Select>
                  </div>
                </Form.Item>

                <Form.Item label="Trạng thái">
                  <Select
                    placeholder="Chọn trạng thái"
                    className="form__card--select"
                    value={formData.recurrence?.status?.code ?? 1}
                    onChange={(value) => {
                      handleOnChange("recurrence", {
                        ...(formData.recurrence ?? {
                          type: "",
                          nextDueDate: null,
                        }),
                        status: { code: value, label: getStatusLabel(value) },
                      });
                    }}
                  >
                    <Select.Option value={1}>Đang hoạt động</Select.Option>
                    <Select.Option value={0}>Tạm dừng</Select.Option>
                    <Select.Option value={-1}>Đã hủy</Select.Option>
                  </Select>
                </Form.Item>
              </Card>
            )}
          </div>

          <Card title="Ví tiền" className="form__card">
            <Form.Item
              name="paymentMethod"
              rules={[
                { required: true, message: "Vui lòng chọn ví thanh toán!" },
              ]}
              label="Chọn ví tiền"
            >
              <div className="form__card--item">
                <Select
                  className="form__card--select"
                  placeholder="Chọn ví"
                  value={formData.paymentMethod}
                  onChange={(value) => handleOnChange("paymentMethod", value)}
                >
                  {wallets &&
                    wallets.map((wallet) => (
                      <Select.Option key={wallet.id} value={wallet.name}>
                        {wallet.name}
                      </Select.Option>
                    ))}
                </Select>
              </div>
            </Form.Item>
          </Card>

          <Form.Item>
            <Button className="form__card--button" htmlType="submit">
              Lưu giao dịch
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditTransaction;
