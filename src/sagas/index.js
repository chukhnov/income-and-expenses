import { INCOME, CATEGORY, EXPENSE } from '../common/constants'
import { put, call, takeEvery, all } from 'redux-saga/effects'
import { apiCall } from '../utils/fetchSimulator'
import { createAction } from '../utils'

// **********************INCOME************************
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

function * deleteIncome (action) {
  const { payload } = action
  const bodyObject = {
    type: 'incomes',
    itemId: payload
  }

  const incomesData = yield call(apiCall.delete, bodyObject)
  if (!incomesData) {
    return yield put(createAction(INCOME.DELETE.FAIL)())
  }
  yield put(createAction(INCOME.DELETE.SUCCESS)(incomesData))
}

function * editIncome (action) {
  const { payload } = action
  const bodyObject = {
    type: 'incomes',
    data: payload
  }

  const incomesData = yield call(apiCall.edit, bodyObject)
  if (!incomesData) {
    return yield put(createAction(INCOME.EDIT.FAIL)())
  }
  yield put(createAction(INCOME.EDIT.SUCCESS)(incomesData))
}

// ****************************************************

// **********************EXPENSE************************

function * getExpenses () {
  const expensesData = yield call(apiCall.get, 'expenses')
  if (!expensesData) {
    return yield put(createAction(EXPENSE.GET_ALL.FAIL)())
  }
  yield put(createAction(EXPENSE.GET_ALL.SUCCESS)(expensesData))
}

function * addExpense (action) {
  const { payload } = action
  const bodyObject = {
    type: 'expenses',
    data: payload
  }

  const expensesData = yield call(apiCall.set, bodyObject)
  if (!expensesData) {
    return yield put(createAction(EXPENSE.ADD.FAIL)())
  }
  yield put(createAction(EXPENSE.ADD.SUCCESS)(expensesData))
}

function * deleteExpense (action) {
  const { payload } = action
  const bodyObject = {
    type: 'expenses',
    itemId: payload
  }

  const expensesData = yield call(apiCall.delete, bodyObject)
  if (!expensesData) {
    return yield put(createAction(EXPENSE.DELETE.FAIL)())
  }
  yield put(createAction(EXPENSE.DELETE.SUCCESS)(expensesData))
}

function * editExpense (action) {
  const { payload } = action
  const bodyObject = {
    type: 'expenses',
    data: payload
  }

  const expensesData = yield call(apiCall.edit, bodyObject)
  if (!expensesData) {
    return yield put(createAction(EXPENSE.EDIT.FAIL)())
  }
  yield put(createAction(EXPENSE.EDIT.SUCCESS)(expensesData))
}

// ****************************************************

// **********************CATEGORY************************

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
    takeEvery(INCOME.DELETE.REQUEST, deleteIncome),
    takeEvery(INCOME.EDIT.REQUEST, editIncome),
    takeEvery(EXPENSE.GET_ALL.REQUEST, getExpenses),
    takeEvery(EXPENSE.ADD.REQUEST, addExpense),
    takeEvery(EXPENSE.DELETE.REQUEST, deleteExpense),
    takeEvery(EXPENSE.EDIT.REQUEST, editExpense),
    takeEvery(CATEGORY.GET_ALL.REQUEST, getCategories)
  ])
}
