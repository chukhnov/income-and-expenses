import { CATEGORY } from '../common/constants'

const initialState = {
  isFetching: true,
  categoriesData: []
}

export default function categoryReducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CATEGORY.GET_ALL.REQUEST: {
      return { ...initialState }
    }
    case CATEGORY.GET_ALL.SUCCESS: {
      return {
        isFetching: false,
        incomesData: payload
      }
    }
    case CATEGORY.GET_ALL.FAIL: {
      return {
        ...state,
        isFetching: false
      }
    }
    case CATEGORY.ADD.REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case CATEGORY.ADD.SUCCESS: {
      return {
        isFetching: false,
        incomesData: payload
      }
    }
    case CATEGORY.ADD.FAIL: {
      return {
        ...state,
        isFetching: false
      }
    }
    default:
      return state
  }
}
