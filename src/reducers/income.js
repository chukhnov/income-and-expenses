import { INCOME } from '../common/constants'

const initialState = {
  isFetching: true,
  incomesData: []
}

export default function expenceReducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case INCOME.GET_ALL.REQUEST: {
      return {
        isFetching: true,
        incomesData: []
      }
    }
    case INCOME.GET_ALL.SUCCESS: {
      return {
        isFetching: false,
        incomesData: payload
      }
    }
    case INCOME.GET_ALL.FAIL: {
      return {
        isFetching: false
      }
    }
    default:
      return state
  }
}
