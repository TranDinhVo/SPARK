import { useEffect, useState } from "react";
import { Input, Select, DatePicker, Form, Button, InputNumber, Modal, Spin } from "antd";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { LoadingOutlined } from "@ant-design/icons";

import "./TransactionForm/RecurringTransactionModelForm.scss";
import { getCategoryRecurringTransaction, updateRecurringTransaction } from "../../services/RecurringTransactionService";

const EditRecurringTransactionForm = (props) => {
  const { 
    userId, 
    fetchRecurring, 
    showEditForm, 
    setShowEditForm, 
    recurringLoading, 
    setRecurringLoading, 
    selectedRecurring,
    categories
  } = props;

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(null);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (selectedRecurring) {
      form.setFieldsValue({
        name: selectedRecurring.name,
        recurrenceType: selectedRecurring.type,
        nextDueDate: dayjs(selectedRecurring.nextDate),
        categoryRecurringTransaction: selectedRecurring.categoryId,
        amount: selectedRecurring.amount
      });
    }
    const category = categories.find(cat => cat.id === selectedRecurring.categoryRecurringTransaction);
    setCategoryEdit(category);
  }, [selectedRecurring, form]);

  const handleCancel = () => {
    if (selectedRecurring) {
      form.setFieldsValue({
        name: selectedRecurring.name,
        recurrenceType: selectedRecurring.type,
        nextDueDate: dayjs(selectedRecurring.nextDate),
        categoryRecurringTransaction: selectedRecurring.categoryId,
        amount: selectedRecurring.amount
      });
    }
    setShowEditForm(false);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      // Tạo object chứa các trường đã thay đổi
      const changedFields = {};
      
      // So sánh từng trường với giá trị ban đầu
      if (values.name !== selectedRecurring.name) {
        changedFields.name = values.name;
      }
      if (values.recurrenceType !== selectedRecurring.type) {
        changedFields.recurrenceType = values.recurrenceType;
      }
      if (values.nextDueDate.format("YYYY-MM-DD") !== selectedRecurring.nextDate) {
        changedFields.nextDueDate = values.nextDueDate.format("YYYY-MM-DD");
      }
      if (values.categoryRecurringTransaction !== selectedRecurring.categoryRecurringTransaction?.id) {
        changedFields.categoryRecurringTransaction = values.categoryRecurringTransaction;
      }
      if (Number(values.amount) !== selectedRecurring.amount) {
        changedFields.amount = Number(values.amount);
      }

      // Nếu không có trường nào thay đổi
      if (Object.keys(changedFields).length === 0) {
        Swal.fire({
          title: 'Thông báo!',
          text: 'Không có thay đổi nào được thực hiện',
          icon: 'info',
          confirmButtonText: 'Đồng ý',
          confirmButtonColor: 'var(--primary-color)',
          customClass: {
            popup: 'animated fadeInDown'
          }
        });
        handleCancel();
        return;
      }

      // Thêm các trường bắt buộc
      const data = {
        ...changedFields,
        userId: userId,
      };
      
      // Thêm timeout để tạo hiệu ứng loading
      await new Promise(resolve => setTimeout(resolve, 500));
      const res = await updateRecurringTransaction(selectedRecurring.id,data);
      if(res){
        await Swal.fire({
          title: 'Thành công!',
          text: 'Giao dịch định kỳ đã được cập nhật',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'animated fadeInDown'
          }
        });
        handleCancel();
        await fetchRecurring();
      }
    } catch (error) {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Không thể cập nhật giao dịch định kỳ. Vui lòng thử lại!',
        icon: 'error',
        confirmButtonText: 'Đồng ý',
        confirmButtonColor: 'var(--primary-color)',
        customClass: {
          popup: 'animated fadeInDown'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showEditForm}
      onCancel={handleCancel}
      footer={null}
      title={
        <span
          style={{
            fontWeight: 600,
            fontSize: 20,
            color: "var(--primary-color)",
          }}
        >
          Chỉnh sửa giao dịch định kỳ
        </span>
      }
      width={450}
      centered
      maskClosable={false}
    >
      <div className="recurring-transaction-model-form">
        <Spin spinning={loading || recurringLoading} indicator={antIcon}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            preserve={true}
          >
            <Form.Item
              name="name"
              label="Tên giao dịch"
              rules={[{ required: true, message: "Vui lòng nhập tên giao dịch!" }]}
            >
              <Input placeholder="Nhập tên giao dịch" />
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
                label="Ngày giao dịch tiếp theo"
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
                  defaultValue={categoryEdit?.id}
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
                <InputNumber
                  style={{ width: 180 }}
                  placeholder="Nhập số tiền"
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  min={1}
                  precision={0}
                  step={1000}
                  addonAfter="VNĐ"
                />
              </Form.Item>
            </div>
      
            <div className="rtmf__btns">
              <Button 
                onClick={handleCancel} 
                className="rtmf__btn rtmf__btn--cancel"
                disabled={recurringLoading}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="rtmf__btn rtmf__btn--submit"
                loading={loading}
              >
                Cập nhật
              </Button>
            </div>
          </Form>
        </Spin>
      </div>
    </Modal>
  );
};

export default EditRecurringTransactionForm; 