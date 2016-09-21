export const TOGGLE_FILTER = 'TOGGLE_FILTER'
export const toggleFilter = (filterObject) => {
  return {
    type: TOGGLE_FILTER,
    filterObject: filterObject
  }
}

export const REMOVE_FILTER = 'REMOVE_FILTER'
export const removeFilter = (filterObject) => {
  return {
    type: REMOVE_FILTER,
    filterObject: filterObject
  }
}

export const ADD_FILTER = 'ADD_FILTER'
export const addFilter = (filterObject) => {
  return {
    type: ADD_FILTER,
    filterObject: filterObject
  }
}

export const CLEAR_FILTER = 'CLEAR_FILTER'
export const clearFilters = () => {
  return {
    type: CLEAR_FILTER
  }
}
