import { INCOME } from '../common/constants'
import { put, call, takeEvery, all } from 'redux-saga/effects'
import { apiCall } from '../utils/fetchSimulator'
import { createAction } from '../utils'

function * getIncomes () {
  const incomesData = yield call(apiCall.get, 'incomes')
  if (!incomesData) {
    return yield put(createAction(INCOME.GET_ALL.FAIL)())
  }
  yield put(createAction(INCOME.GET_ALL.SUCCESS)(incomesData))
}

export default function * rootSaga () {
  yield all([
    takeEvery(INCOME.GET_ALL.REQUEST, getIncomes)
  ])
}
