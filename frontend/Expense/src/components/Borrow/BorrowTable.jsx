import { Space, Table, Tag, Button } from "antd";
import dayjs from "dayjs";
import HighlightText from "../HighlightText";
import DetailBorrow from "./DetailBorrow";
import "../../assets/scss/BorrowTable.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2';
import 'animate.css';
import { deleteBorrow } from "../../services/BorrowService";

const BorrowTable = (props) => {
    const { borrowType, filteredList, loading, onReload, searchText, setIsOpenModalEdited, setBorrowDataEdit } = props;

    const handleDelete = async (record) => {
      const result = await Swal.fire({
        title: "Bạn có chắc chắn muốn xoá?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Xoá ngay",
        cancelButtonText: "Hủy",
        showClass: {
          popup: 'animate__animated animate__zoomIn animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__zoomOut animate__faster'
        }
      });
  
      if (result.isConfirmed) {
        const response = await deleteBorrow(record.id);
        if (response) {
          await Swal.fire({
            title: "Xóa thành công!",
            text: "Bản ghi đã được xoá.",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            showClass: {
              popup: 'animate__animated animate__zoomIn animate__faster'
            },
            hideClass: {
              popup: 'animate__animated animate__zoomOut animate__faster'
            }
          });
          onReload();
        } else {
          await Swal.fire({
            title: "Lỗi!",
            text: "Xoá bản ghi không thành công.",
            icon: "error",
            confirmButtonColor: "#d33",
            showClass: {
              popup: 'animate__animated animate__zoomIn animate__faster'
            },
            hideClass: {
              popup: 'animate__animated animate__zoomOut animate__faster'
            }
          });
        }
      }
    };
    const columns = [
        {
          title: borrowType === "CHO_VAY" ? "Người cho vay" : "Người đi vay",
          dataIndex: "counterpartyName",
          key: "counterpartyName",
          render: (text) => <HighlightText text={text} keyword={searchText} />,
        },

        {
          title: "Số tiền " + (borrowType === "DI_VAY" ? "vay" : "cho vay"),
          dataIndex: "amountLoan",
          key: "amountLoan",
          render: (amount) => (
            <span style={{ color: borrowType === "DI_VAY" ? "green" : "red" }}>
              {borrowType === "DI_VAY" ? "+ " : "- "}
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
          title: "Ngày " + (borrowType === "DI_VAY" ? "trả" : "thu") + " tới",
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
              DA_HUY: { color: "red", text: "Đã hủy" },
            };
            const config = statusConfig[status];
            if (!config) {
              return <Tag color="default">Không xác định</Tag>;
            }
            return <Tag color={config.color}>{config.text}</Tag>;
          },
        },
        {
          title: "Tiền " + (borrowType === "DI_VAY" ? "đã trả" : "đã thu"),
          dataIndex: "paidAmount",
          key: "paidAmount",
          render: (amount) =>  <span style={{ color: borrowType === "DI_VAY" ? "red" : "green" }}>{ borrowType === "DI_VAY" ? "- "+amount.toLocaleString("vi-VN") + " VND" : "+ " + amount.toLocaleString("vi-VN") + " VND"}</span>
        },
        {
          title: "Thao tác",
          key: "action",
          render: (_, record) => (
            <Space>
              <Button 
                type="text" 
                danger 
                onClick={() => handleDelete(record)}
              >
                <DeleteOutlined />
              </Button>
              <Button 
                type="text" 
                danger 
                onClick={() => {
                  setIsOpenModalEdited(true);
                  setBorrowDataEdit(record);
                }}
              >
                <EditOutlined />
              </Button>
              
              <DetailBorrow record={record} />
            </Space>
          ),
        },
      ];
    return <>
         <Table
          columns={columns}
          dataSource={Array.isArray(filteredList) ? filteredList : []}
          rowKey="id"
          pagination={false}
          scroll={filteredList.length <= 10 ? { y: 450 } : undefined}
          className="borrow-table"
          loading={loading}
        />
    </>
}
export default BorrowTable;