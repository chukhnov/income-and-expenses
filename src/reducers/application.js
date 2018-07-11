import { LOADED } from '../common/constants'

export default function applicationReducer (state = {
  loaded: true
}, action) {
  const { type, payload } = action
  switch (type) {
    case LOADED: {
      return {
        loaded: payload
      }
    }
    default:
      return state
  }
}
