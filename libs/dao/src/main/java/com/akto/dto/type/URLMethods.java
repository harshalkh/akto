package com.akto.dto.type;

public class URLMethods {

    public enum Method {
        GET, POST, PUT, DELETE, HEAD, OPTIONS, TRACE, PATCH, OTHER;

        public static Method fromString(String text) {
            if (text == null) return OTHER;
            for (Method b : Method.values()) {
                if (b.name().equalsIgnoreCase(text)) {
                    return b;
                }
            }
            return OTHER;
        }
    }
}
