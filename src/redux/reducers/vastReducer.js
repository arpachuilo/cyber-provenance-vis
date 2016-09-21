import { toggleFilter, removeFilter, addFilter, clearFilters } from './vast'
import { TOGGLE_FILTER, REMOVE_FILTER, ADD_FILTER, CLEAR_FILTERS } from '../actions'

import ipData from '../../data/IPLog3.5.csv'
import proxData from '../../data/proxLog.csv'
import employeeData from '../../data/employeeData.csv'

const initialState = {
  ipData: ipData,
  proxData: proxData,
  employeeData: employeeData,
  ipDataFiltered: ipData,
  proxDataFiltered: proxData,
  employeeDataFiltered: employeeData,
  filters: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER: {
      return toggleFilter(state, action.filterObject)
    }
    case REMOVE_FILTER: {
      return removeFilter(state, action.filterObject)
    }
    case ADD_FILTER: {
      return addFilter(state, action.filterObject)
    }
    case CLEAR_FILTERS: {
      return clearFilters(state)
    }
  }
  return state
}
