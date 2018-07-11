import { INCOME } from '../common/constants'

export default function expenceReducer (state = [], action) {
  const { type, payload } = action
  switch (type) {
    case INCOME.GET_ALL.SUCCESS: {
      return {
        ...payload
      }
    }
    default:
      return state
  }
}
