package com.akto.dto.CollectionConditions;

import java.util.List;

import com.akto.dto.ApiInfo.ApiInfoKey;

public class ApiListCondition extends CollectionCondition{

    List<ApiInfoKey> apiList;

    public List<ApiInfoKey> getApiList() {
        return apiList;
    }

    public void setApiList(List<ApiInfoKey> apiList) {
        this.apiList = apiList;
    }

    public ApiListCondition() {
        super(Type.API_LIST);
    }

    public ApiListCondition(List<ApiInfoKey> apiList) {
        super(Type.API_LIST);
        this.apiList = apiList;
    }

    @Override
    public List<ApiInfoKey> returnApis() {
        return apiList;
    }

    @Override
    public boolean containsApi(ApiInfoKey key) {
        return apiList.contains(key);
    }
    
}
