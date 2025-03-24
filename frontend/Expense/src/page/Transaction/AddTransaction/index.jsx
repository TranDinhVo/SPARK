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
} from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  DollarOutlined,
  TagOutlined,
  FileTextOutlined,
  WalletOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import "./AddTransaction.scss";
import { get } from "../../../utils/request";
dayjs.locale("vi");

function AddTransaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isRecurring, setIsRecurring] = useState(false);
  const [createAt, SetCreateAt] = useState(dayjs());
  const [wallets, setWallets] = useState([]);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const fetchApi = async (api) => {
    const result = await get(api);
    return result;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletsData /*, categoriesData, transactionsData*/] =
          await Promise.all([
            fetchApi("wallets"),
            //     fetchApi("categories"),
            //     fetchApi("transactions"),
          ]);

        setWallets(walletsData);
        // setCategories(categoriesData);
        // setTransactions(transactionsData);
      } catch (error) {
        console.error("Lỗi khi fetch API:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = (values) => {
    console.log(values);
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Thêm giao dịch
      </Button>

      <Modal
        title="Thêm giao dịch mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          //   initialValues={{ isRecurring: false }}
        >
          <Form.Item
            name="category"
            rules={[{ required: true, message: "Vui lòng chọn tên danh mục!" }]}
          >
            <TagOutlined />
            <Input placeholder="Danh mục" />
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
          >
            <DollarOutlined />
            <InputNumber placeholder="Số tiền" min={0} />
          </Form.Item>

          <Form.Item>
            <Form.Item name="note">
              <FileTextOutlined />
              <Input.TextArea placeholder="Nhập ghi chú (nếu có)..." rows={2} />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="date"
            label="Ngày giao dịch"
            rules={[{ required: true, message: "Chọn ngày giao dịch!" }]}
            initialValue={dayjs()}
          >
            <CalendarOutlined />
            <DatePicker
              showTime
              format={(value) => value.format("dddd, DD [Tháng] MM YYYY")}
              value={createAt}
              onChange={(date) => SetCreateAt(date)}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại giao dịch"
            rules={[{ required: true, message: "Chọn loại giao dịch!" }]}
          >
            <Select placeholder="Chọn loại">
              <Select.Option value="chi_tieu">Chi tiêu</Select.Option>
              <Select.Option value="thu_nhap">Thu nhập</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="wallet"
            rules={[
              { required: true, message: "Vui lòng chọn ví thanh toán!" },
            ]}
          >
            <WalletOutlined />
            <Select placeholder="Chọn ví">
              {wallets &&
                wallets.map((wallet, index) => {
                  return (
                    <>
                      <Select.Option key={index} value={wallet.id}>
                        {wallet.name}
                      </Select.Option>
                    </>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item
            name="isRecurring"
            label="Giao dịch định kỳ"
            valuePropName="checked"
          >
            <SyncOutlined style={{ color: "#1890ff", fontSize: "16px" }} />
            <Switch onChange={(checked) => setIsRecurring(checked)} />
          </Form.Item>

          {isRecurring && (
            <Form.Item
              name="recurrenceType"
              label="Chu kỳ giao dịch"
              rules={[
                { required: isRecurring, message: "Chọn chu kỳ giao dịch!" },
              ]}
            >
              <Select placeholder="Chọn chu kỳ">
                <Select.Option value="tuan">Hằng tuần</Select.Option>
                <Select.Option value="thang">Hằng tháng</Select.Option>
                <Select.Option value="quy">Hằng quý</Select.Option>
                <Select.Option value="nam">Hằng năm</Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu giao dịch
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddTransaction;
