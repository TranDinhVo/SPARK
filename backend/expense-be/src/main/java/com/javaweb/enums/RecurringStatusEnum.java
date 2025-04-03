package com.javaweb.enums;

public enum RecurringStatusEnum {
//	DANG_HOAT_DONG, 
//    TAM_DUNG,       
//    DA_HUY 
	ACTIVE(1, "Đang hoạt động"),
    COMPLETED(0, "Tạm dừng"),
    CANCELLED(-1, "Đã huỷ");

    private final int code;
    private final String label;


    RecurringStatusEnum(int code, String label) {
        this.code = code;
        this.label = label;
    }


    public int getCode() {
        return code;
    }


    public String getLabel() {
        return label;
    }

    public static RecurringStatusEnum fromCode(int code) {
        for (RecurringStatusEnum status : values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy status với code: " + code);
    }
}
