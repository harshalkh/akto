package com.akto.dto;

import java.util.List;

import com.akto.dto.CollectionConditions.CollectionCondition;

public class CustomCollection extends ApiCollection{

    List<CollectionCondition> conditions;

    public CustomCollection(int id, String name, List<CollectionCondition> conditions) {
        this.id = id;
        this.name = name;
        this.conditions = conditions;
    }

    public CustomCollection() {
    }

    public List<CollectionCondition> getConditions() {
        return conditions;
    }

    public void setConditions(List<CollectionCondition> conditions) {
        this.conditions = conditions;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", conditions='" + getConditions() + "'" +
            "}";
    }

}
