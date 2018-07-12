import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'

import { INCOME, CATEGORY } from '../../common/constants'
import { createAction } from '../../utils'
import { IncomeWrapper } from './style'
import IncomeForm from './IncomeForm'
import Loader from '../Loader/'

class Income extends Component {
  state = {
    openNoIncomesDialog: true,
    createIncome: false
  }
  componentWillMount () {
    this.props.getIncomes()
    this.props.getCategories()
  }

  onCloseIncomeDialog = () => {
    this.setState({
      createIncome: false
    })
  }

  noIncomesDialogStatus = () => {
    const {
      isFetching,
      incomesData
    } = this.props
    return !isFetching && !incomesData.length
  }

  getNoIncomesDialog = () => {
    const actions = [
      <FlatButton
        key={'cancel'}
        label="Cancel"
        onClick={this.props.history.goBack}
        primary
      />,
      <FlatButton
        key={'newIncome'}
        keyboardFocused
        label="Add New Income"
        onClick={() => this.setState({createIncome: true, openNoIncomesDialog: false})}
        primary
      />
    ]

    return this.noIncomesDialogStatus() ? <Dialog
      actions={actions}
      modal={false}
      open={this.state.openNoIncomesDialog}
    >
          No Incomes were found. Do you want to add first?
    </Dialog> : null
  }

  getCreateIncomeDialog = () => {
    const { categoriesData } = this.props
    return <Dialog
      modal={false}
      open={this.state.createIncome}
    >
      <IncomeForm
        categoriesData={categoriesData}
        onCloseIncomeDialog={this.onCloseIncomeDialog}
      />
    </Dialog>
  }

  getParsedDate = input => {
    const date = new Date(input)
    const values = [ date.getDate(), date.getMonth() + 1 ]
    for (var id in values) {
      values[id] = values[id].toString().replace(/^([0-9])$/, '0$1')
    }
    return `${values[0]}.${values[1]}.${date.getFullYear()}`
  }

  getParsedCategory = categoryId => {
    const { categoriesData } = this.props
    if (categoriesData.length) {
      const { value } = categoriesData.find(el => el._id === categoryId) || {}
      return value || 'No Category'
    }
    return null || 'No Category'
  }

  render () {
    const { isFetching, incomesData } = this.props
    return <IncomeWrapper>
      {this.getNoIncomesDialog()}
      {this.getCreateIncomeDialog()}
      <Loader isFetching={isFetching}/>
      <div className='table-wrapper'>
        <Paper zDepth={3}>
          <Table
            selectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Category</TableHeaderColumn>
                <TableHeaderColumn>Amount</TableHeaderColumn>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {incomesData.map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{this.getParsedCategory(row.category)}</TableRowColumn>
                  <TableRowColumn>{`$${row.amount} USD`}</TableRowColumn>
                  <TableRowColumn>{this.getParsedDate(row.date)}</TableRowColumn>
                  <TableRowColumn>{row.description}</TableRowColumn>
                  <TableRowColumn>
                    <FlatButton
                      label="Delete"
                      onClick={() => this.setState({createIncome: true, openNoIncomesDialog: false})}
                      primary
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </IncomeWrapper>
  }
}

Income.propTypes = {
  incomesData: PropTypes.array,
  categoriesData: PropTypes.array,
  isFetching: PropTypes.bool,
  getIncomes: PropTypes.func,
  getCategories: PropTypes.func,
  history: PropTypes.object
}

function mapStateToProps (state) {
  const {
    incomeReducer: {
      incomesData,
      isFetching: isFetchingIncomes
    },
    categoryReducer: {
      categoriesData,
      isFetching: isFetchingCategories
    }
  } = state

  return {
    incomesData,
    categoriesData,
    isFetching: isFetchingIncomes || isFetchingCategories
  }
}

export default connect(mapStateToProps, {
  getIncomes: createAction(INCOME.GET_ALL.REQUEST),
  getCategories: createAction(CATEGORY.GET_ALL.REQUEST)
})(Income)
