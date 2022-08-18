package com.akto.dto.testing;


import com.akto.dto.type.SingleTypeInfo;

import java.util.ArrayList;
import java.util.List;

public class TestResult {

    private String message;
    private boolean vulnerable;
    private List<TestError> errors;

    private List<SingleTypeInfo> privateSingleTypeInfos = new ArrayList<>();

    public enum TestError {
        NO_PATH, NO_HAPPY_PATH, NO_AUTH_MECHANISM, API_REQUEST_FAILED
    }

    public TestResult(String message, boolean vulnerable, List<TestError> errors, List<SingleTypeInfo> privateSingleTypeInfos) {
        this.message = message;
        this.vulnerable = vulnerable;
        this.errors = errors;
        this.privateSingleTypeInfos = privateSingleTypeInfos;
    }

    public TestResult() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isVulnerable() {
        return vulnerable;
    }

    public void setVulnerable(boolean vulnerable) {
        this.vulnerable = vulnerable;
    }

    public List<TestError> getErrors() {
        return errors;
    }

    public void setErrors(List<TestError> errors) {
        this.errors = errors;
    }

    public List<SingleTypeInfo> getPrivateSingleTypeInfos() {
        return privateSingleTypeInfos;
    }

    public void setPrivateSingleTypeInfos(List<SingleTypeInfo> privateSingleTypeInfos) {
        this.privateSingleTypeInfos = privateSingleTypeInfos;
    }
}
