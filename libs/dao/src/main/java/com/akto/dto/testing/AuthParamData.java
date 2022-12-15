package com.akto.dto.testing;

public class AuthParamData {

    private AuthParam.Location where;
    private String key;

    private String value;

    public AuthParamData() { }
    public AuthParamData(AuthParam.Location where, String key, String value) {
        this.where = where;
        this.key = key;
        this.value = value;
    }

    public AuthParam.Location getWhere() {return this.where;}

    public String getKey() {
        return this.key;
    }

    public String getValue() {
        return this.value;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setWhere(AuthParam.Location where) {this.where = where;}

    public Boolean validate() {
        if (this.key == null || this.value == null || this.where == null) {
            return false;
        }
        return true;
    }

}


