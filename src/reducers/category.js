import { CATEGORY } from '../common/constants'

export default function categoryReducer (state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case CATEGORY.ADD: {
      return {
        ...payload
      }
    }
    case CATEGORY.DELETE: {
      return {
        ...payload
      }
    }
    case CATEGORY.EDIT: {
      return {
        ...payload
      }
    }
    default:
      return state
  }
}
