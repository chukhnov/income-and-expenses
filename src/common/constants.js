const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAIL = 'FAIL'

export function createRequestTypes (base) {
  return [REQUEST, SUCCESS, FAIL].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export const INCOME = {
  GET: createRequestTypes('INCOME.GET'),
  GET_ALL: createRequestTypes('INCOME.GET_ALL'),
  ADD: createRequestTypes('INCOME.ADD'),
  DELETE: createRequestTypes('INCOME.DELETE'),
  EDIT: createRequestTypes('INCOME.EDIT')
}

export const EXPENSE = {
  GET: createRequestTypes('EXPENSE.GET'),
  GET_ALL: createRequestTypes('EXPENSE.GET_ALL'),
  ADD: createRequestTypes('EXPENSE.ADD'),
  DELETE: createRequestTypes('EXPENSE.DELETE'),
  EDIT: createRequestTypes('EXPENSE.EDIT')
}

export const CATEGORY = {
  GET: createRequestTypes('CATEGORY.GET'),
  GET_ALL: createRequestTypes('CATEGORY.GET_ALL'),
  ADD: createRequestTypes('CATEGORY.ADD'),
  DELETE: createRequestTypes('CATEGORY.DELETE'),
  EDIT: createRequestTypes('CATEGORY.EDIT')
}
