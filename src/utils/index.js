export function createAction (type) {
  const action = payload => ({
    type: type,
    payload
  })
  return action
}

export const getParsedDate = input => {
  const date = new Date(input)
  const values = [ date.getDate(), date.getMonth() + 1 ]
  for (var id in values) {
    values[id] = values[id].toString().replace(/^([0-9])$/, '0$1')
  }
  return `${values[0]}.${values[1]}.${date.getFullYear()}`
}

export const getParsedCategory = (categoryId, categoriesData) => {
  console.log({categoriesData, categoryId})
  if (categoriesData.length) {
    const { value } = categoriesData.find(el => el._id === categoryId) || {}
    return value || 'No Category'
  }
  return null || 'No Category'
}
