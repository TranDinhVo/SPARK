package com.javaweb.enums;

import java.util.Map;
import java.util.TreeMap;

public enum RecurringTypeEnum {

	MONTHLY("Tháng"),
    WEEKLY("Tuần"),
    QUARTY("Quý"),
    YEARLY("Năm");

    private final String recurringTypeName;


    private RecurringTypeEnum(String recurringTypeName) {
		this.recurringTypeName = recurringTypeName;
	}



	public String getRecurringTypeName() {
		return recurringTypeName;
	}



	public static Map<String, String> type() {
        
		Map<String, String> recurringTypes = new TreeMap();
		for(RecurringTypeEnum it: RecurringTypeEnum.values()) {
			recurringTypes.put(it.toString(), it.recurringTypeName);
		}
		return recurringTypes;
    }
}
