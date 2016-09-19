const addEvents = (state, item) => {
  let items = state.items
  items.push(item)

  return {
    items: items
  }
}

const removeEvents = (state, item) => {
  // Remove events based on passed filter
  let items = state.items
  let index = items.indexOf(item)
  items.splice(index, 1)

  return {
    items: items
  }
}

const clearEvents = () => {
  return {
    items: []
  }
}

export { addEvents, removeEvents, clearEvents }
