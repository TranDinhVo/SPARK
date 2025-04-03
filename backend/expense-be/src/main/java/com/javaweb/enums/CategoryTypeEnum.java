package com.javaweb.enums;

public enum CategoryTypeEnum {
    EXPENSE("Khoản chi"),
    INCOME("Khoản thu");

    private final String description;

    CategoryTypeEnum(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
