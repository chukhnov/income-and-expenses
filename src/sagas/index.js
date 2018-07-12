import { INCOME, CATEGORY } from '../common/constants'
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

function * addIncome (action) {
  const { payload } = action
  const bodyObject = {
    type: 'incomes',
    data: payload
  }

  const incomesData = yield call(apiCall.set, bodyObject)
  if (!incomesData) {
    return yield put(createAction(INCOME.ADD.FAIL)())
  }
  yield put(createAction(INCOME.ADD.SUCCESS)(incomesData))
}

function * getCategories () {
  const categoriesData = yield call(apiCall.get, 'categories')
  if (!categoriesData) {
    return yield put(createAction(CATEGORY.GET_ALL.FAIL)())
  }
  yield put(createAction(CATEGORY.GET_ALL.SUCCESS)(categoriesData))
}

export default function * rootSaga () {
  yield all([
    takeEvery(INCOME.GET_ALL.REQUEST, getIncomes),
    takeEvery(INCOME.ADD.REQUEST, addIncome),
    takeEvery(CATEGORY.GET_ALL.REQUEST, getCategories)
  ])
}
