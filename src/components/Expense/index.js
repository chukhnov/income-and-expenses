import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import GoBackIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import AddNewIcon from 'material-ui/svg-icons/content/add'
import EditIcon from 'material-ui/svg-icons/image/edit'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import { EXPENSE, CATEGORY } from '../../common/constants'
import { createAction, getParsedCategory, getParsedDate } from '../../utils'
import { ExpenseWrapper } from './style'
import ExpenseForm from './ExpenseForm'
import Loader from '../Loader/'

class Expense extends Component {
  state = {
    openNoExpensesDialog: true,
    createExpense: false,
    selectedExpense: null
  }
  componentWillMount () {
    this.props.getExpenses()
    this.props.getCategories()
  }

  onCloseExpenseDialog = () => {
    this.setState({
      createExpense: false,
      selectedExpense: null
    })
  }

  noExpensesDialogStatus = () => {
    const {
      isFetching,
      expensesData
    } = this.props
    return !isFetching && !expensesData.length
  }

  getNoExpensesDialog = () => {
    const actions = [
      <Link key={'cancel'}
        to="/">
        <FlatButton
          label="Cancel"
          primary
        /></Link>,
      <FlatButton
        key={'newExpense'}
        keyboardFocused
        label="Add New Expense"
        onClick={() => this.setState({createExpense: true, openNoExpensesDialog: false})}
        primary
      />
    ]

    return this.noExpensesDialogStatus() ? <Dialog
      actions={actions}
      modal={false}
      open={this.state.openNoExpensesDialog}
    >
          No Expenses were found. Do you want to add first?
    </Dialog> : null
  }

  getCreateExpenseDialog = () => {
    const { categoriesData } = this.props
    const { selectedExpense, createExpense } = this.state
    return <Dialog
      modal={false}
      open={createExpense}
    >
      <ExpenseForm
        categoriesData={categoriesData}
        onCloseExpenseDialog={this.onCloseExpenseDialog}
        selectedExpense={selectedExpense}
      />
    </Dialog>
  }

  render () {
    const { isFetching, expensesData, categoriesData } = this.props
    return <ExpenseWrapper>
      {this.getNoExpensesDialog()}
      {this.getCreateExpenseDialog()}
      <Loader isFetching={isFetching}/>
      <div className='table-wrapper'>
        <AppBar
          title={<span>EXPENSE LIST</span>}
          titleStyle={{textAlign: 'center'}}
          iconElementLeft={<Link to="/"><RaisedButton
            label="Main menu"
            primary={true}
            icon={<GoBackIcon />}
          /></Link>}
          iconElementRight={<RaisedButton
            label="Add New Expense"
            labelPosition="before"
            onClick={() => this.setState({createExpense: true})}
            primary={true}
            icon={<AddNewIcon />}
          />}
          className='app-bar'
        />
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
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {expensesData.map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{getParsedCategory(row.categoryId, categoriesData)}</TableRowColumn>
                  <TableRowColumn>{`- $${row.amount} USD`}</TableRowColumn>
                  <TableRowColumn>{getParsedDate(row.date)}</TableRowColumn>
                  <TableRowColumn>{row.description}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton onClick={() => this.setState({ createExpense: true, selectedExpense: row })}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => this.props.deleteExpense(row._id)} iconStyle={{fill: 'red'}}>
                      <DeleteIcon />
                    </IconButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </ExpenseWrapper>
  }
}

Expense.propTypes = {
  expensesData: PropTypes.array,
  categoriesData: PropTypes.array,
  isFetching: PropTypes.bool,
  getExpenses: PropTypes.func,
  getCategories: PropTypes.func,
  deleteExpense: PropTypes.func,
  history: PropTypes.object
}

function mapStateToProps (state) {
  const {
    expenseReducer: {
      expensesData,
      isFetching: isFetchingExpenses
    },
    categoryReducer: {
      categoriesData,
      isFetching: isFetchingCategories
    }
  } = state

  return {
    expensesData,
    categoriesData,
    isFetching: isFetchingExpenses || isFetchingCategories
  }
}

export default connect(mapStateToProps, {
  getExpenses: createAction(EXPENSE.GET_ALL.REQUEST),
  deleteExpense: createAction(EXPENSE.DELETE.REQUEST),
  getCategories: createAction(CATEGORY.GET_ALL.REQUEST)
})(Expense)
