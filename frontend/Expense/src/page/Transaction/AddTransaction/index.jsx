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
  PlusOutlined,
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
import { createTransaction } from "../../../services/TransactionService";
// import { createRecurringTransaction } from "../../../services/RecurringTransactionService";
dayjs.locale("vi");

function AddTransaction(props) {
  const { onReLoad } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isRecurring, setIsRecurring] = useState(false);
  const [createAt, SetCreateAt] = useState(dayjs());
  const [wallets, setWallets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  // const [transactions, setTransactions] = useState([]);

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
        const [
          walletsData,
          categoriesData,
          categoryTypesData /*, transactionsData*/,
        ] = await Promise.all([
          fetchApi("wallets"),
          fetchApi("categories"),
          fetchApi("categoryTypes"),
          //     fetchApi("transactions"),
        ]);

        setWallets(walletsData);
        setCategories(categoriesData);
        setCategoryTypes(categoryTypesData);
        // setTransactions(transactionsData);
      } catch (error) {
        console.error("Lỗi khi fetch API:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (values) => {
    values.recurrence = values.recurrence ? values.recurrence : null;
    const result = await createTransaction(values);
    // let resultRecurring = null;
    // if (values.recurrence != null) {
    //   // console.log(result);
    //   const recurringTransaction = {
    //     transactionId: result.id,
    //     recurringType: result.recurrence.type,
    //     nextDueDate: result.recurrence.next_date,
    //     status: values.recurrence.status
    //       ? ["DA_HUY", "TAM_DUNG", "DANG_HOAT_DONG"][
    //           values.recurrence.status.code + 1
    //         ]
    //       : "DANG_HOAT_DONG",
    //   };
    //   resultRecurring = await createRecurringTransaction(recurringTransaction);
    // }
    if (result) {
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Tạo giao dịch thành công!",
        showConfirmButton: false,
        timer: 3000,
      });
      onReLoad();
      form.resetFields();
      setIsModalOpen(false);
    } else {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: "Tạo giao dịch thất bại!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <Button
        className="button-add"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Thêm giao dịch
      </Button>

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
          //   layout="vertical"
          onFinish={handleSubmit}
          //   initialValues={{ isRecurring: false }}
          className="form__list"
        >
          <Card title="Thông tin" className="form__card">
            <Form.Item name="type" hidden></Form.Item>
            <Form.Item
              name="category"
              rules={[
                { required: true, message: "Vui lòng chọn tên danh mục!" },
              ]}
            >
              <div
                className="form__card--item"
                // onClick={() => setIsModalCategory(true)}
              >
                <div className="form__card--logo">
                  <TagOutlined />
                </div>
                <div className="form__card--input">
                  {/* <Input placeholder="chọn tên danh mục.." /> */}
                  <CategoryForm
                    onChange={(category) => {
                      if (form) {
                        form.setFieldsValue({
                          type: category.type, // Lưu loại danh mục
                          category: category.name, // Lưu tên danh mục
                        });
                      }
                    }}
                    categories={categories}
                    categoryTypes={categoryTypes}
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
                    value={createAt}
                    onChange={(date) => SetCreateAt(date)}
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
                onChange={(checked) => setIsRecurring(checked)}
                className="custom-switch"
              />
            </div>

            {isRecurring && (
              <Card className="form__card">
                <Form.Item
                  name="recurrence"
                  label="Chu kỳ"
                  rules={[
                    {
                      required: isRecurring,
                      message: "Chọn chu kỳ giao dịch!",
                    },
                  ]}
                >
                  <div className="form__card--item">
                    <Select
                      placeholder="Chọn chu kỳ"
                      className="form__card--select"
                      onChange={(value) =>
                        form.setFieldsValue({
                          recurrence: {
                            type: value,
                            next_date: null,
                            status: {
                              code: 1,
                              label: "Đang hoạt động",
                            },
                          },
                        })
                      }
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
                  onChange={(value) =>
                    form.setFieldValue("paymentMethod", value)
                  }
                >
                  {wallets &&
                    wallets.map((wallet, index) => {
                      return (
                        <>
                          <Select.Option key={index} value={wallet.name}>
                            {wallet.name}
                          </Select.Option>
                        </>
                      );
                    })}
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

export default AddTransaction;
