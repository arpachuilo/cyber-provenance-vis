import { addItem, removeItem, clearItems } from './list'
import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS } from '../actions'

const initialState = {
  items: [
    'a',
    'b',
    'c'
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return addItem(state, action.item)
    }
    case REMOVE_ITEM: {
      return removeItem(state, action.item)
    }
    case CLEAR_ITEMS: {
      return clearItems()
    }
  }
  return state
}
