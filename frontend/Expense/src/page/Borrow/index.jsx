import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Table,
  Tag,
  Space,
  Modal,
  Form,
  DatePicker,
  Select,
} from "antd";
import { PlusOutlined, SwapOutlined } from "@ant-design/icons";
import { FiSearch } from "react-icons/fi";
import "./Borrow.scss";
import { getCookie } from "../../helpers/cookie";
import { getBorrowByUser } from "../../services/BorrowService";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { removeVietnameseTones } from "../../helpers/normalize";
import HighlightText from "../../components/HighlightText";
import DeleteBorrow from "./DeleteBorrow";
import EditBorrow from "./EditBorrow";
import DetailBorrow from "./DetailBorrow";

function Borrow() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [borrowType, setBorrowType] = useState("DI_VAY");
  const [borrowList, setBorrowList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = getCookie("id");
  const navigate = useNavigate();
  const fetchApi = async () => {
    const result = await getBorrowByUser(userId);
    setBorrowList(Array.isArray(result) ? result : []);
    setFilteredList(Array.isArray(result) ? result : []);
  };
  useEffect(() => {
    fetchApi();
  }, [userId]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const filtered = (Array.isArray(borrowList) ? borrowList : []).filter(
        (item) => {
          const matchesType = item.loanType === borrowType;
          const search = removeVietnameseTones(searchText.toLowerCase());
          const name = removeVietnameseTones(
            item.counterpartyName.toLowerCase()
          );
          const matchesSearch = search ? name.includes(search) : true;
          return matchesType && matchesSearch;
        }
      );
      setFilteredList(filtered);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [borrowType, searchText, borrowList]);
  const onReload = () => {
    fetchApi();
  };
  const typeOptions = [
    { value: "DI_VAY", label: "Đi vay" },
    { value: "CHO_VAY", label: "Cho vay" },
  ];

  const statusOptions = [
    { value: "CHUA_TRA", label: "Chưa trả" },
    { value: "DA_TRA", label: "Đã trả" },
    { value: "DANG_TRA", label: "Đang trả dần" },
    { value: "DA_HUY", label: "Đã hủy" },
  ];

  const columns = [
    {
      title: borrowType === "CHO_VAY" ? "Người cho vay" : "Người đi vay",
      dataIndex: "counterpartyName",
      key: "counterpartyName",
      render: (text) => <HighlightText text={text} keyword={searchText} />,
    },
    {
      title: "Loại",
      dataIndex: "loanType",
      key: "loanType",
      render: (type) => (
        <Tag color={type === "CHO_VAY" ? "green" : "orange"}>
          {type === "CHO_VAY" ? "Cho vay" : "Đi vay"}
        </Tag>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "amountLoan",
      key: "amountLoan",
      render: (amount) => (
        <span style={{ color: borrowType === "DI_VAY" ? "red" : "#52c41a" }}>
          {borrowType === "DI_VAY" ? "- " : "+ "}
          {amount.toLocaleString("vi-VN")} VND
        </span>
      ),
    },
    {
      title: "Lãi suất",
      dataIndex: "interestRate",
      key: "interestRate",
      render: (rate) => `${rate}%`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày đến hạn",
      dataIndex: "nextDueDate",
      key: "nextDueDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig = {
          DANG_HOAT_DONG: { color: "blue", text: "Đang hoạt động" },
          HOAN_THANH: { color: "green", text: "Hoàn thành" },
          DA_HUY: { color: "gray", text: "Đã hủy" },
        };
        const config = statusConfig[status];
        if (!config) {
          return <Tag color="default">Không xác định</Tag>;
        }
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Đã trả",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (amount) => amount.toLocaleString("vi-VN") + " VND",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <DeleteBorrow record={record} onReLoad={onReload} />
          <EditBorrow record={record} onReLoad={onReload} />
          <DetailBorrow record={record} />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    navigate(`/borrow/edit/${record.id}`);
  };

  const handleDetail = (record) => {
    navigate(`/borrow/detail/${record.id}`);
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: "Cảnh báo!",
      html: `<span style='color:#d33;font-size:18px;font-weight:bold;'>Bạn chắc chắn muốn xóa khoản vay với <b>${record.counterpartyName}</b>?</span>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa ngay",
      cancelButtonText: "Hủy",
      focusCancel: true,
      customClass: {
        popup: "swal2-border-danger",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Gọi API xóa ở đây, ví dụ: await deleteBorrow(record.id);
        Swal.fire("Đã xóa!", "Khoản vay đã được xóa.", "success");
        // TODO: Sau đó reload lại danh sách nếu cần
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      // Handle form submission
      console.log(values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleTypeToggle = () => {
    setBorrowType(borrowType === "DI_VAY" ? "CHO_VAY" : "DI_VAY");
  };

  return (
    <div className="borrow-container">
      <div className="borrow-header">
        <div className="borrow-header__left">
          <div className="borrow-search">
            <FiSearch className="borrow-search__icon" />
            <Input
              placeholder="Tìm kiếm theo tên..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="borrow-search__input"
              bordered={false}
              allowClear
            />
          </div>
        </div>
        <div className="borrow-header__right">
          <Button
            // type="primary"
            icon={<SwapOutlined />}
            onClick={handleTypeToggle}
            className="borrow-toggle-btn"
          >
            {borrowType === "DI_VAY" ? "Đi vay" : "Cho vay"}
          </Button>
          <Button
            // type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="borrow-add-btn"
          >
            Thêm {borrowType === "DI_VAY" ? "khoản vay" : "cho vay"}
          </Button>
        </div>
      </div>

      <div className="borrow-content">
        <Table
          columns={columns}
          dataSource={Array.isArray(filteredList) ? filteredList : []}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="borrow-table"
          loading={loading}
        />
      </div>

      <Modal
        title={`Thêm ${borrowType === "DI_VAY" ? "khoản vay" : "cho vay"}`}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText="Thêm"
        cancelText="Hủy"
        width={600}
      >
        <Form form={form} layout="vertical" className="borrow-form">
          <Form.Item
            name="loanType"
            label="Loại"
            rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
            initialValue={borrowType}
          >
            <Select
              placeholder="Chọn loại"
              options={typeOptions}
              className="borrow-select"
            />
          </Form.Item>

          <Form.Item
            name="counterpartyName"
            label="Người vay/cho vay"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Nhập tên người vay/cho vay" />
          </Form.Item>

          <Form.Item
            name="amountLoan"
            label="Số tiền"
            rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
          >
            <Input type="number" placeholder="Nhập số tiền" />
          </Form.Item>

          <Form.Item
            name="interestRate"
            label="Lãi suất (%)"
            rules={[{ required: true, message: "Vui lòng nhập lãi suất!" }]}
          >
            <Input type="number" step="0.01" placeholder="Nhập lãi suất" />
          </Form.Item>

          <Form.Item
            name="nextDueDate"
            label="Ngày đến hạn"
            rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select
              placeholder="Chọn trạng thái"
              options={statusOptions}
              className="borrow-select"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Borrow;
