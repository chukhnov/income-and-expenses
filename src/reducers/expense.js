import { EXPENSE } from '../common/constants'

export default function expenseReducer (state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case EXPENSE.ADD: {
      return {
        ...payload
      }
    }
    case EXPENSE.DELETE: {
      return {
        ...payload
      }
    }
    case EXPENSE.EDIT: {
      return {
        ...payload
      }
    }
    default:
      return state
  }
}
