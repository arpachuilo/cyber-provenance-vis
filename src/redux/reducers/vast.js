import mergewith from 'lodash.mergewith'
import remove from 'lodash.remove'
import isArray from 'lodash.isArray'
import isempty from 'lodash.isempty'
import has from 'lodash.has'

// private helper function for lodash.mergewith
const customizer = (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

// private helper function filtering array
const applyFilters = (data, filterObject) => {
  // Return all data if filter object is empty
  if (isempty(filterObject)) {
    return data
  }

  let filteredData = []

  // Get relevant keys from filterObject for dataset
  let keys = Object.keys(data[0])
  for (let i = 0; i < data.length; i++) {
    let datum = data[i]
    let keep = true
    for (let j = 0; j < keys.length; j++) {
      if (has(filterObject, keys[j])) {
        let value = datum[keys[j]]
        if (filterObject[keys[j]].indexOf(value) < 0) {
          keep = false
        }
      }
    }
    if (keep) {
      filteredData.push(datum)
    }
  }

  return filteredData
}

// NOTE: Only uses first key with it's first value in its array
const toggleFilter = (state, filterObject) => {
  let key = Object.keys(filterObject)[0]
  let value = Object.values(filterObject)[0][0]
  // Has associated value, therefore more checks required
  if (has(state.filterObject, key)) {
    // Has key with associated value in array
    if (state.filterObject[key].indexOf(value) > -1) {
      return removeFilter(state, filterObject)
    } else { // Has key but lacks associated value
      return addFilter(state, filterObject)
    }
  } else { // Lacks any associated key
    return addFilter(state, filterObject)
  }
}

const removeFilter = (state, filterObject) => {
  let key = Object.keys(filterObject)[0]

  let newAttributes = remove(state.filterObject[key], (a) => {
    return filterObject[key].indexOf(a)
  })

  if (newAttributes.length > 0) {
    state.filterObject[key] = newAttributes
  } else {
    delete state.filterObject[key]
  }

  return {
    ipData: state.ipData,
    proxData: state.proxData,
    employeeData: state.employeeData,
    ipDataFiltered: applyFilters(state.ipData, state.filterObject),
    proxDataFiltered: applyFilters(state.proxData, state.filterObject),
    employeeDataFiltered: applyFilters(state.employeeData, state.filterObject),
    filterObject: state.filterObject
  }
}

const addFilter = (state, filterObject) => {
  let newFilterObject = mergewith(state.filterObject, filterObject, customizer)

  return {
    ipData: state.ipData,
    proxData: state.proxData,
    employeeData: state.employeeData,
    ipDataFiltered: applyFilters(state.ipData, newFilterObject),
    proxDataFiltered: applyFilters(state.proxData, newFilterObject),
    employeeDataFiltered: applyFilters(state.employeeData, newFilterObject),
    filterObject: newFilterObject
  }
}

const clearFilters = (state) => {
  return {
    ipData: state.ipData,
    proxData: state.proxData,
    employeeData: state.employeeData,
    ipDataFiltered: state.ipData,
    proxDataFiltered: state.proxData,
    employeeDataFiltered: state.employeeData,
    filters: {}
  }
}

export { toggleFilter, addFilter, removeFilter, clearFilters }
