package com.javaweb.Utils;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;

public class MapUtil {
	public static <T> T getObject(Map<String,Object> params, String key, Class<T> tClass){
		Object obj = params.getOrDefault(key, null);
	    if (obj != null) {
	        if (tClass.getTypeName().equals("java.lang.Long")) {
	            obj = obj != "" ? Long.valueOf(obj.toString()) : null;
	        } else if (tClass.getTypeName().equals("java.lang.Integer")) {
	            obj = obj != "" ? Integer.valueOf(obj.toString()) : null;
	        } else if (tClass.equals(BigDecimal.class)) {
                obj = obj.toString().isEmpty() ? null : new BigDecimal(obj.toString());
	        } else if (tClass.equals(Instant.class)) {
                obj = obj.toString().isEmpty() ? null : Instant.parse(obj.toString());
	        } else if (tClass.getTypeName().equals("java.lang.String")) {
	            obj = obj.toString();
	        } else if (tClass.isEnum()) {
	            obj = obj != "" ? Enum.valueOf((Class<Enum>) tClass, obj.toString()) : null;
	        }
	        else if (tClass.equals(LocalDate.class)) {
	        	obj = obj.toString().isEmpty() ? null : LocalDate.parse(obj.toString());
	        }
	        return tClass.cast(obj);
	    }
	    return null;
	}
}
