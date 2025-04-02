package com.javaweb.enums;

public enum RecurringTypeEnum {

	MONTHLY("Tháng"),
    WEEKLY("Tuần"),
    QUARTY("Quý"),
    YEARLY("Năm");

    private final String label;

    RecurringTypeEnum(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static RecurringTypeEnum fromLabel(String label) {
        for (RecurringTypeEnum type : values()) {
            if (type.getLabel().equalsIgnoreCase(label)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy type với label: " + label);
    }
}
