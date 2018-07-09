import { INCOME } from '../common/constants'

export default function expenceReducer (state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case INCOME.ADD: {
      return {
        ...payload
      }
    }
    case INCOME.DELETE: {
      return {
        ...payload
      }
    }
    case INCOME.EDIT: {
      return {
        ...payload
      }
    }
    default:
      return state
  }
}
