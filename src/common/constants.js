const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAIL = 'FAIL'

export const LOADED = 'LOADED'

export function createRequestTypes (base) {
  return [REQUEST, SUCCESS, FAIL].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export const INCOME = {
  GET: 'INCOME.GET',
  GET_ALL: createRequestTypes('INCOME.GET_ALL'),
  ADD: 'INCOME.ADD',
  DELETE: 'INCOME.DELETE',
  EDIT: 'INCOME.EDIT'
}

export const EXPENSE = {
  GET: 'EXPENSE.GET',
  GET_ALL: 'EXPENSE.GET_ALL',
  ADD: 'EXPENSE.ADD',
  DELETE: 'EXPENSE.DELETE',
  EDIT: 'EXPENSE.EDIT'
}

export const CATEGORY = {
  GET: 'CATEGORY.GET',
  GET_ALL: 'CATEGORY.GET_ALL',
  ADD: 'CATEGORY.ADD',
  DELETE: 'CATEGORY.DELETE',
  EDIT: 'CATEGORY.EDIT'
}
