import { combineReducers } from 'redux'

import categoryReducer from './category'
import expenseReducer from './expense'
import incomeReducer from './income'

const rootReducer = combineReducers({
  categoryReducer,
  expenseReducer,
  incomeReducer
})

export default rootReducer
