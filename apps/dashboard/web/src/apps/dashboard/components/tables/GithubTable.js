import {
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  IndexFiltersMode,
  useIndexResourceState,
  Pagination} from '@shopify/polaris';
import GithubRow from './rows/GithubRow';
import CustomChoiceList from './filterChoices/ChoiceList';

import { useState, useCallback, useEffect, useRef } from 'react';

function GithubTable(props) {

  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Filtering);
  const [selected, setSelected] = useState(0);
  const [sortSelected, setSortSelected] = useState([props.sortOptions[0].value]);
  const [data, setData] = useState(props.data);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [queryValue, setQueryValue] = useState('');

  useEffect(() => {
    let tempData = props.data;
    let singleFilterData = tempData
    appliedFilters.map((filter) => {
      singleFilterData = props.data;
      let filterSet = new Set(filter.value);
      singleFilterData = singleFilterData.filter((value) => {
        return [...value[filter.key]].filter(v => filterSet.has(v)).length > 0
      })
      tempData = tempData.filter(value => singleFilterData.includes(value));
    })

    tempData = tempData.filter((value) => {
      return value.name.toLowerCase().includes(queryValue.toLowerCase());
    })

    let sortKey = props.sortOptions.filter(value => {
      return (value.value === sortSelected[0])
    })[0].sortKey;
    let sortDirection = sortSelected[0].split(" ")[1];
    tempData.sort((a, b) => {
      return (sortDirection == 'asc' ? -1 : 1) * (a[sortKey] - b[sortKey]);
    })
    setData([...tempData])
  }, [sortSelected, appliedFilters, queryValue, props.data])

  const handleRemoveAppliedFilter = (key) => {
    let temp = appliedFilters
    temp = temp.filter((filter) => {
      return filter.key != key
    })
    setAppliedFilters(temp);
  }

  const changeAppliedFilters = (key, value) => {
    let temp = appliedFilters
    temp = temp.filter((filter) => {
      return filter.key != key
    })
    if(value.length>0){
      temp.push({
        key: key,
        label: props.disambiguateLabel(key, value),
        onRemove: handleRemoveAppliedFilter,
        value: value
      })
    }
    setAppliedFilters(temp);
  };

  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );
  const handleFiltersQueryClear = useCallback(
    () => setQueryValue(""),
    [],
  );

  const selectedFilters = (key) =>(value) => {
    changeAppliedFilters(key, value);
  }
  let filters = formatFilters(props.filters)
  function formatFilters(filters) {
    return filters
      .filter((filter) => {
        return filter.availableChoices!=undefined ? filter.availableChoices.size > 0 : false;
      })
      .map((filter) => {
        return {
          key: filter.key,
          label: filter.label,
          filter: (
            <CustomChoiceList 
              filter={filter} 
              selectedFilters={selectedFilters(filter.key)}
              appliedFilters={
                appliedFilters.filter((localFilter) => { return localFilter.key == filter.key }).length == 1 ? 
                appliedFilters.filter((localFilter) => { return localFilter.key == filter.key })[0].value : []} />
          ),
          // shortcut: true,
          pinned: true

        }
      })
  }

  const handleFiltersClearAll = useCallback(() => {
    setAppliedFilters([])
  }, []);

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);

  const fun = () => {
    console.log("func", sortSelected)
  }
  
  let rowMarkup = data.map(
    (
      data,
      index,
    ) => (
      <GithubRow 
        key={data.hexId}
        data={data} 
        index={index} 
        getActions={props.getActions} 
        selectedResources={selectedResources}
        headers={props.headers}
        hasRowActions={props.hasRowActions || false}/>
    ),
  );

  return (
    <div>
      <LegacyCard>
        <IndexFilters
          sortOptions={props.sortOptions}
          sortSelected={sortSelected}
          queryValue={queryValue}
          queryPlaceholder={`Searching in ${data.length} test run${data.length==1 ? '':'s'}`}
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={handleFiltersQueryClear}
          onSort={setSortSelected}
          // primaryAction={primaryAction}
          cancelAction={{
            onAction: fun,
            disabled: false,
            loading: false,
          }}
          tabs={[]}
          selected={selected}
          onSelect={setSelected}
          canCreateNewView={false}
          filters={filters}
          appliedFilters={appliedFilters}
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        />
        <IndexTable
          resourceName={props.resourceName}
          itemCount={data.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          // condensed
          selectable={props.selectable || false}
          onSelectionChange={handleSelectionChange}
          headings={[
            {
              id: "data",
              hidden: true,
              flush: true
            }
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
      {/* <Pagination
      hasPrevious
      onPrevious={() => {
        console.log('Previous');
      }}
      hasNext
      onNext={() => {
        console.log('Next');
      }}
    /> */}
    </div>
  );

}

export default GithubTable