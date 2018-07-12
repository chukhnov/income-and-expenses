import { EXPENSE } from '../common/constants'

const initialState = {
  isFetching: true,
  expensesData: []
}

export default function expenseReducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case EXPENSE.GET_ALL.REQUEST: {
      return { ...initialState }
    }
    case EXPENSE.GET_ALL.SUCCESS: {
      return {
        isFetching: false,
        expensesData: payload
      }
    }
    case EXPENSE.GET_ALL.FAIL: {
      return {
        ...state,
        isFetching: false
      }
    }
    case EXPENSE.ADD.REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case EXPENSE.ADD.SUCCESS: {
      return {
        isFetching: false,
        expensesData: payload
      }
    }
    case EXPENSE.ADD.FAIL: {
      return {
        ...state,
        isFetching: false
      }
    }
    case EXPENSE.DELETE.REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case EXPENSE.DELETE.SUCCESS: {
      return {
        isFetching: false,
        expensesData: payload
      }
    }
    case EXPENSE.DELETE.FAIL: {
      return {
        ...state,
        isFetching: false
      }
    }
    case EXPENSE.EDIT.REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case EXPENSE.EDIT.SUCCESS: {
      return {
        isFetching: false,
        expensesData: payload
      }
    }
    case EXPENSE.EDIT.FAIL: {
      return {
        ...state,
        isFetching: false
      }
    }
    default:
      return state
  }
}
