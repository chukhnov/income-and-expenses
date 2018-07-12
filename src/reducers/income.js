import { INCOME } from '../common/constants'

const initialState = {
  isFetching: true,
  incomesData: []
}

export default function expenceReducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case INCOME.GET_ALL.REQUEST: {
      return { ...initialState }
    }
    case INCOME.GET_ALL.SUCCESS: {
      return {
        isFetching: false,
        incomesData: payload
      }
    }
    case INCOME.GET_ALL.FAIL: {
      return {
        ...state,
        isFetching: false
      }
    }
    case INCOME.ADD.REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case INCOME.ADD.SUCCESS: {
      return {
        isFetching: false,
        incomesData: payload
      }
    }
    case INCOME.ADD.FAIL: {
      return {
        ...state,
        isFetching: false
      }
    }
    default:
      return state
  }
}
