import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Spin,
  Row,
  Col,
  Card,
  Input,
  DatePicker,
  Form,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import CustomPieChart from "../../components/Goal/CustomPieChart";
import { getGoalById, updateGoal } from "../../services/GoalsSavingService";
import {
  getTransactionByUser,
  deleteTransaction,
} from "../../services/TransactionService";
import { getCookie } from "../../helpers/cookie";
import { formatDateTime } from "../../helpers/formatDateTime";
import { formatDate } from "../../helpers/formatDate";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Swal from "sweetalert2";
import "../../assets/scss/GoalDetail.scss";
import GoalsSavingAdd from "./GoalsSavingAdd";

const GoalDetail = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const userId = getCookie("id");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const fetchDetail = async () => {
    try {
      const goalRes = await getGoalById(id);
      const transRes = await getTransactionByUser(userId);
      const transByGoal = transRes
        .filter(
          (item) => item.goalId != null && String(item.goalId) === String(id)
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setGoal(goalRes);
      setTransactions(transByGoal || []);

      // Khởi tạo form với dữ liệu hiện tại
      form.setFieldsValue({
        goalName: goalRes.goalName,
        targetAmount: goalRes.targetAmount,
        deadline: goalRes.deadline ? dayjs(goalRes.deadline) : null,
      });
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết mục tiêu:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetail();
  }, [id, form]);

  const onReload = () => {
    fetchDetail();
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.setFieldsValue({
      goalName: goal.goalName,
      targetAmount: goal.targetAmount,
      deadline: goal.deadline ? dayjs(goal.deadline) : null,
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      dayjs.extend(utc);
      const updatedGoal = {
        goalName: values.goalName,
        targetAmount: Number(values.targetAmount),
        deadline: values.deadline
          ? dayjs(values.deadline).utc().startOf("day").toISOString()
          : null,
      };

      const result = await updateGoal(id, updatedGoal);
      if (result) {
        Swal.fire({
          title: "🔄 Đang cập nhật mục tiêu...",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1000,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        setIsEditing(false);
        fetchDetail();
        Swal.fire({
          icon: "success",
          title: "🎯 Cập nhật thành công!",
          text: "Mục tiêu đã được cập nhật.",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật mục tiêu:", error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await Swal.fire({
        title: "🔄 Đang xóa giao dịch...",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const result = await deleteTransaction(transactionId);
      console.log(result);
      if (result) {
        await Swal.fire({
          icon: "success",
          title: "🎉 Đã xóa!",
          text: "Giao dịch đã được xóa thành công.",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        fetchDetail();
      }
    } catch (error) {
      console.error("Lỗi khi xóa giao dịch:", error);
      message.error("Có lỗi xảy ra khi xóa giao dịch!");
    }
  };

  if (loading || !goal) {
    return <Spin tip="Đang tải chi tiết..." />;
  }

  const percent = (goal.currentAmount / goal.targetAmount) * 100;
  return (
    <Card className="goal-detail-card">
      <Button onClick={handleBack} style={{ marginBottom: 8 }}>
        ← Quay lại
      </Button>
      <Row gutter={32}>
        <Col md={10} xs={24} className="goal-detail__left">
          <Form form={form} layout="vertical">
            {isEditing ? (
              <>
                <Form.Item
                  name="goalName"
                  label="Tên mục tiêu"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên mục tiêu!" },
                  ]}
                >
                  <Input placeholder="Nhập tên mục tiêu" />
                </Form.Item>
                <Form.Item
                  name="deadline"
                  label="Thời gian kết thúc"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn thời gian kết thúc!",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày kết thúc"
                    showTime={false}
                  />
                </Form.Item>
              </>
            ) : (
              <>
                <h3 className="goal-detail__title">{goal.goalName}</h3>
                <div className="goal-detail__date">
                  {formatDateTime(new Date(goal.deadline))}
                </div>
              </>
            )}

            <div className="goal-detail__stats">
              <div className="stat">
                <span className="label">Tiết kiệm hiện tại</span>
                <span className="value orange">
                  {goal.currentAmount.toLocaleString("vi-VN")} VND
                </span>
              </div>
              {isEditing ? (
                <Form.Item
                  name="targetAmount"
                  label="Mục tiêu"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số tiền mục tiêu!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Nhập số tiền mục tiêu"
                    addonAfter="VND"
                  />
                </Form.Item>
              ) : (
                <div className="stat">
                  <span className="label">Mục tiêu</span>
                  <span className="value">
                    {goal.targetAmount.toLocaleString("vi-VN")} VND
                  </span>
                </div>
              )}

              <div className="stat">
                <span className="label">Tỉ lệ hoàn thành</span>
                <span className="value">{percent.toFixed(2)}%</span>
              </div>
              <div className="stat">
                <span className="label">Tình trạng</span>
                <span className="value">Đang hoạt động</span>
              </div>
            </div>
          </Form>

          <Divider />
          <CustomPieChart percent={percent} />
        </Col>

        <Col md={14} xs={24} className="goal-detail__right">
          <div className="goal-detail__right--list">
            <h4>Danh sách giao dịch</h4>
            <GoalsSavingAdd savingList={goal} onReload={onReload} />
          </div>

          <ul className="transaction-list">
            {transactions.length > 0 ? (
              transactions.map((t, i) => (
                <li key={i} className="transaction-item">
                  <div
                    className="icon"
                    dangerouslySetInnerHTML={{ __html: t.iconUrl }}
                  />
                  <div className="info">
                    <div className="name">{t.name}</div>
                    <div className="time">{formatDate(t.createdAt)}</div>
                  </div>
                  <div className="amount-note">
                    <div className="amount">
                      {t.amount >= 0 ? "+" : "-"}
                      {Math.abs(t.amount).toLocaleString("vi-VN")}đ
                    </div>
                    <div className="note">{t.description}</div>
                  </div>
                  {isEditing && (
                    <div className="transaction-actions">
                      {/* <Popconfirm
                        title="Xóa giao dịch"
                        description="Bạn có chắc chắn muốn xóa giao dịch này?"
                        onConfirm={() => handleDeleteTransaction(t.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                      > */}
                      {/* <Tooltip title="Xóa giao dịch"> */}
                      <Button
                        type="text"
                        shape="circle"
                        danger
                        icon={<DeleteOutlined />}
                        className="delete-btn"
                        onClick={() => handleDeleteTransaction(t.id)}
                      />
                      {/* </Tooltip> */}
                      {/* </Popconfirm> */}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>Chưa có giao dịch nào cho mục tiêu này</p>
            )}
          </ul>

          <div className="goal-detail__buttons">
            {isEditing ? (
              <>
                <Button onClick={handleCancel}>Hủy</Button>
                <Button type="primary" onClick={handleSave}>
                  Lưu
                </Button>
              </>
            ) : (
              <Button className="edit-btn" onClick={handleEdit}>
                Chỉnh sửa
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default GoalDetail;
