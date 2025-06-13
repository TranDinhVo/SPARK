import React from "react";
import { Button, Tag, Spin, Table, Space, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "./TransactionRecurringDetail.scss";
import DeleteTransaction from "../DeleteTransaction";
import DetailTransaction from "../DetailTransaction";
import { updateRecurringTransactionStatus } from "../../../services/RecurringTransactionService";
import Swal from "sweetalert2";

function TransactionRecurringDetail(props) {
  const { onReload, fetchRecurring, data, loading, transactionsAll = [], onEdit, onDelete } = props;

  const handleUpdateStatus = async (recurring) => {
    try {
      const { value: newStatus } = await Swal.fire({
        title: 'Cập nhật trạng thái',
        input: 'select',
        inputOptions: {
          'ACTIVE': 'Đang hoạt động',
          'COMPLETED': 'Tạm dừng',
          'CANCELLED': 'Đã hủy'
        },
        inputValue: recurring.status?.code,
        showCancelButton: true,
        confirmButtonText: 'Cập nhật',
        cancelButtonText: 'Hủy',
        confirmButtonColor: 'var(--primary-color)',
        customClass: {
          popup: 'animated fadeInDown'
        },
        inputValidator: (value) => {
          if (!value) {
            return 'Vui lòng chọn trạng thái!';
          }
        }
      });

      if (newStatus) {
        const loadingAlert = Swal.fire({
          title: 'Đang cập nhật...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const res = await updateRecurringTransactionStatus(recurring.id, {status: newStatus});
        
        await loadingAlert.close();

        if (res) {
          await Swal.fire({
            title: 'Thành công!',
            text: 'Trạng thái đã được cập nhật',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'animated fadeInDown'
            }
          });
          fetchRecurring();
          onReload();
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Không thể cập nhật trạng thái. Vui lòng thử lại!',
        icon: 'error',
        confirmButtonText: 'Đồng ý',
        confirmButtonColor: 'var(--primary-color)',
        customClass: {
          popup: 'animated fadeInDown'
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="recurring-detail__loading">
        <Spin tip="Đang tải chi tiết..." />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="recurring-detail__empty">
        Chọn giao dịch định kỳ để xem chi tiết
      </div>
    );
  }
  // Lọc transaction liên quan đến recurring này
  const relatedTransactions = transactionsAll.filter(
    (t) => t.recurrence && t.recurrence.id === data.id
  );

  const columns = [{
    title: "STT",
    dataIndex: "index",
    key: "index",
    render: (v, r, i) => i + 1,
  },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (v) => v.toLocaleString("vi-VN") + " đ",
    },
    {
      title: "Ngày",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v) => dayjs(v).format("DD/MM/YYYY"),
    },
    {
      title: "Thao tác",
      width: "100px",
      key: "action",
      render: (_, record) => (
        <Space>
          <DeleteTransaction record={record} onReLoad={onReload} />
          <DetailTransaction record={record} />
        </Space>
      ),

    }
  ];

  return (
    <div className="recurring-detail__wrapper">
      <div className="recurring-detail__header">
        <div className="recurring-detail__title">{data.name}</div>
        <div className="recurring-detail__actions">
          <Button
            icon={<EditOutlined />}
            onClick={onEdit}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={onDelete}>
            Xóa
          </Button>
        </div>
      </div>
      <div className="recurring-detail__info">
        <div className="recurring-detail__info--row">
          <div>
            <b>Chu kỳ:</b> <Tag color="blue">{data.type}</Tag>
          </div>
          <div>
            <b>Số tiền:</b>
            <span style={{ marginLeft: 8, color: 'var(--primary-color)', fontWeight: 500 }}>
              {data.amount?.toLocaleString('vi-VN')} VNĐ
            </span>
          </div>
          <div>
            <b>Trạng thái:</b>
            <Tag 
              color={
                data.status?.code === 1 ? "green" : 
                data.status?.code === 0 ? "orange" : 
                "red"
              } 
              onClick={() => handleUpdateStatus(data)} 
              style={{ cursor: 'pointer' }}
            >
              {data.status?.lable}
            </Tag>
           
          </div>
        </div>

        <div className="recurring-detail__info--row">
        
          <div>
            <b>Ngày Tạo:</b>
            <span>{dayjs(data.createAt).format("DD/MM/YYYY")}</span>
          </div>
          <div>
            <b>Ngày giao dịch tiếp theo:</b>
            <span> {dayjs(data.nextDate).format("DD/MM/YYYY")}</span>
          </div>
        </div>

        
      </div>
      <div
        className="recurring-detail__transaction-list"
        style={{ marginTop: 24 }}
      >
        <Table
          columns={columns}
          dataSource={relatedTransactions.map((t) => ({ ...t, key: t.id }))}
          pagination={false}
          size="small"
          scroll={{ y: 362 }}
          locale={{ emptyText: "Không có giao dịch nào cho định kỳ này." }}
        />
      </div>
    </div>
  );
}

export default TransactionRecurringDetail;
