import { Form, Input, Modal, InputNumber, DatePicker, Button } from "antd";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useEffect } from 'react';
import "../../assets/scss/createBorrow.scss";
import { createBorrow } from "../../services/BorrowService";
import Swal from 'sweetalert2';

dayjs.extend(utc);
dayjs.extend(timezone);

const CreateBorrow = (props) => {
    const { isOpenModalCreated, setIsOpenModalCreated, borrowType, onReload, userId, categoryList} = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpenModalCreated) {
            form.resetFields();
            form.setFieldsValue({
                loanType: borrowType === "DI_VAY" ? "Đi vay" : "Cho vay"
            });
        }
    }, [borrowType, isOpenModalCreated]);

    const handleSubmit = async () => {
          const categoryId = borrowType === "DI_VAY" ? categoryList.find(item => item.name === "Trả nợ")?.id : categoryList.find(item => item.name === "Thu nợ")?.id;
            const values = await form.validateFields();
     
            const data = {
                ...values,
                nextDueDate: dayjs(values.nextDueDate).format('YYYY-MM-DD'),
                loanType: borrowType,
                userId,
                categoryId,
              
            };

            const result = await createBorrow(data);
            console.log(">> Create data", data);
            console.log(">> Create result", result);
            if (result) {
               await  Swal.fire({
                    title: "Thành công!",
                    text: "Tạo mới khoản vay thành công",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    resetBorrowAll();
                    onReload();
                });
            }
            else {
              await Swal.fire({
                title: "Lỗi!",
                text: "Có lỗi xảy ra khi tạo mới khoản vay",
                icon: "error",
                confirmButtonColor: "#d33",
              });
            }
        
    }

    const resetBorrowAll = () => {
        form.resetFields();
        setIsOpenModalCreated(false);
    }
    return <>
        <Modal
        title={`Thêm ${borrowType === "DI_VAY" ? "khoản vay" : "cho vay"}`}
        open={isOpenModalCreated}
        onCancel={resetBorrowAll}
        maskClosable={false}
        footer={null}
      
    >
    <Form form={form} layout="vertical" className="borrow-form" onFinish={handleSubmit}>
      <Form.Item
        name="loanType"
        label="Loại"
        rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
        initialValue={borrowType === "DI_VAY" ?  "Đi vay": "Cho vay"}
      >
        <Input disabled value={borrowType === "DI_VAY" ?  "Đi vay": "Cho vay"} />
      </Form.Item>

      <Form.Item
        name="counterpartyName"
        label= {borrowType === "DI_VAY" ? "Tên, tổ chức cho vay" : "Tên, tổ chức mượn"}
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input placeholder={borrowType === "DI_VAY" ? "Nhập tên người vay/cho vay" : "Nhập tên người mượn/đi vay"} />
      </Form.Item>

      <Form.Item
        name="amountLoan"
        label="Số tiền"
        rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Nhập số tiền"
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\D/g, '')}
          min={0}
          addonAfter="VNĐ"
          controls={false}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </Form.Item>

      <Form.Item
        name="interestRate"
        label="Lãi suất (%)"
        rules={[{ required: true, message: "Vui lòng nhập lãi suất!" }]}
      >
        <Input type="number" step="0.01" placeholder="Nhập lãi suất" addonAfter="%"/>
      </Form.Item>

      <Form.Item
        name="times"
        label="Thời hạn trả nợ"
        rules={[{ required: true, message: "Vui lòng nhập số tháng trả nợ!" }]}
      >
        <InputNumber
          placeholder="Nhập thời hạn trả nợ"
          min={1}
          style={{ width: "100%" }}
          addonAfter="tháng"
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </Form.Item>

      <Form.Item
        name="nextDueDate"
        label="Ngày bắt đầu "
        rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
      >
        <DatePicker 
          style={{ width: "100%" }}
          format="DD/MM/YYYY"
          placeholder="Chọn ngày bắt đầu"
        />
      </Form.Item>

      <div  className="borrow-form__btns">
        <Button 
          onClick={resetBorrowAll} 
          className="borrow-form__btn-cancel"
        >
          Hủy
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="borrow-form__btn-submit"
             >
               Tạo mới
          </Button>
            </div>
    </Form>
  </Modal>
    </>
}
export default CreateBorrow;