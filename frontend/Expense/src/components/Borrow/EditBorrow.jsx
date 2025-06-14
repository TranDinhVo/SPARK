import { Form, Input, Modal, InputNumber, DatePicker, Button } from "antd";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useEffect } from 'react';
import "../../assets/scss/createBorrow.scss";
import { deleteBorrow, createBorrow } from "../../services/BorrowService";
import Swal from 'sweetalert2';

dayjs.extend(utc);
dayjs.extend(timezone);

const EditBorrow = (props) => {
    const { isOpenModalEdit, setIsOpenModalEdit, borrowType, onReload, userId, categoryList, borrowDataEdit, setBorrowDataEdit } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpenModalEdit && borrowDataEdit) {
            form.setFieldsValue({
                ...borrowDataEdit,
                nextDueDate: dayjs(borrowDataEdit.nextDueDate),
                loanType: borrowType === "DI_VAY" ? "Đi vay" : "Cho vay"
            });
        }
    }, [borrowType, isOpenModalEdit, borrowDataEdit]);

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
        const confirmResult = await Swal.fire({
            title: "Cảnh báo!",
            html: `
                <div style="text-align: left;">
                    <p>Việc cập nhật thông tin khoản vay này sẽ ảnh hưởng đến:</p>
                    <ul style="text-align: left; margin-left: 20px;">
                        <li>Các giao dịch trước đó liên quan đến khoản vay này</li>
                        <li>Lịch sử thanh toán và số dư</li>
                        <li>Báo cáo tài chính đã được tạo</li>
                    </ul>
                    <p style="font-weight: bold; margin-top: 10px;">Bạn có chắc chắn muốn tiếp tục cập nhật?</p>
                </div>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--primary-color)",
            cancelButtonColor: "#3085d6",
                        cancelButtonText: "Hủy bỏ",
            confirmButtonText: "Có, tôi chắc chắn",

        });

        if (confirmResult.isConfirmed) {
           await deleteBorrow(borrowDataEdit.id);
            const result = await createBorrow(data);
        
            if (result) {
                await Swal.fire({
                    title: "Thành công!",
                    text: "Cập nhật khoản vay thành công",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    resetBorrowAll();
                    onReload();
                });
            } else {
                await Swal.fire({
                    title: "Lỗi!",
                    text: "Có lỗi xảy ra khi cập nhật khoản vay",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        }
    }

    const resetBorrowAll = () => {
        form.resetFields();
        setIsOpenModalEdit(false);
    }

    return <>
        <Modal
            title={`Chỉnh sửa ${borrowType === "DI_VAY" ? "khoản vay" : "cho vay"}`}
            open={isOpenModalEdit}
            onCancel={resetBorrowAll}
            maskClosable={false}
            footer={null}
        >
            <Form form={form} layout="vertical" className="borrow-form" onFinish={handleSubmit}>
                <Form.Item
                    name="loanType"
                    label="Loại"
                    rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
                >
                    <Input disabled value={borrowType === "DI_VAY" ? "Đi vay" : "Cho vay"} />
                </Form.Item>

                <Form.Item
                    name="counterpartyName"
                    label={borrowType === "DI_VAY" ? "Tên, tổ chức cho vay" : "Tên, tổ chức mượn"}
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
                    <Input type="number" step="0.01" placeholder="Nhập lãi suất" addonAfter="%" />
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
                    label="Ngày bắt đầu"
                    rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày bắt đầu"
                    />
                </Form.Item>

                <div className="borrow-form__btns">
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
                        Cập nhật
                    </Button>
                </div>
            </Form>
        </Modal>
    </>
}

export default EditBorrow;
  