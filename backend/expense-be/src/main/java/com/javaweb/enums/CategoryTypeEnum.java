package com.javaweb.enums;

public enum CategoryTypeEnum {
    Chi("Khoản chi"),
    Thu("Khoản thu");

    private final String description;

    CategoryTypeEnum(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
