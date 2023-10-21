package com.akto.dto.CollectionConditions;

import java.util.List;

import com.akto.dto.ApiInfo;

public abstract class CollectionCondition {
    private Type type;

    public CollectionCondition(Type type) {
        this.type = type;
    }

    public abstract List<ApiInfo.ApiInfoKey> returnApis();

    public abstract boolean containsApi (ApiInfo.ApiInfoKey key);

    public enum Type {
        API_LIST
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

}
