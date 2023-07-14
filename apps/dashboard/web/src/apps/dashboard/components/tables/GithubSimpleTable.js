import { useEffect, useState } from "react";
import GithubServerTable from "./GithubServerTable";
import func from "@/util/func";

function GithubSimpleTable(props) {

    const [filters, setFilters] = useState([])
    function fetchDataSync(sortKey, sortOrder, skip, limit, filters, filterOperators, queryValue){
      let localFilters = func.prepareFilters(props.data,props.filters);  
      let filtersFromHeaders = props.headers.filter((header) => {
        return header.showFilter
      }).map((header) => {
        let key = header.filterKey || header.value
        let label = header.filterLabel || header.text
        let allItemValues = []
        props.data.forEach(i => {
          let value = i[key]
          if (value instanceof Set) {
            allItemValues = allItemValues.concat(...value)
          } else if (value instanceof Array) {
            allItemValues = allItemValues.concat(...value)
          } else if (typeof value !== 'undefined') {
            allItemValues.push(value)
          }
        }
        )
        let distinctItems = [...new Set(allItemValues.sort())]
        let choices = distinctItems.map((item) => {return {label:item, value:item}})
        return (
          {
            key: key,
            label: label,
            title: label,
            choices: choices,
            availableChoices: new Set(distinctItems)
          }
        )
      })
      localFilters = localFilters.concat(filtersFromHeaders)
      setFilters(localFilters);
        // console.log("this", props.data, filters);
        let tempData = props.data;
        let singleFilterData = tempData
        Object.keys(filters).forEach((filterKey)=>{
          singleFilterData = props.data;
          let filterSet = new Set(filters[filterKey]);
          if(filterSet.size!=0){
            singleFilterData = singleFilterData.filter((value) => {
                return [].concat(value[filterKey]).filter(v => filterSet.has(v)).length > 0
              })
          }
          tempData = tempData.filter(value => singleFilterData.includes(value));
        })
        tempData = tempData.filter((value) => {
          return func.findInObjectValue(value, queryValue.toLowerCase(), ['hexId', 'time', 'icon', 'order']);
        })
        let dataSortKey = props.sortOptions.filter(value => {
          return (value.value.startsWith(sortKey))
        })[0].sortKey;

        tempData.sort((a, b) => {
          if(typeof a[dataSortKey] ==='number')
          return (sortOrder) * (a[dataSortKey] - b[dataSortKey]);
          if(typeof a[dataSortKey] ==='string')
          return (sortOrder) * (b[dataSortKey].localeCompare(a[dataSortKey]));
        })
        return {value:tempData,total:tempData.length}
    }
    

    return <GithubServerTable
        key={props.data} // passing any value as a "key" re-renders the component when the value is changed.
        fetchData={fetchDataSync}
        sortOptions={props.sortOptions} 
        resourceName={props.resourceName} 
        filters={filters}
        disambiguateLabel={props.disambiguateLabel} 
        headers={props.headers}
        getActions = {props.getActions}
        hasRowActions={props.hasRowActions}
        loading={props.loading}
        selectable = {props.selectable}
        promotedBulkActions = {props.promotedBulkActions}
        hideQueryField={props.hideQueryField}
    />

}

export default GithubSimpleTable