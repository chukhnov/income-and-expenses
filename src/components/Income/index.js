import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { INCOME } from '../../common/constants'
import { createAction } from '../../utils'
import { IncomeWrapper } from './style'
import IncomeForm from './IncomeForm'

class Income extends Component {
  state = {
    openNoIncomesDialog: true,
    createIncome: false
  }
  componentWillMount () {
    this.props.getIncomes()
  }

  noIncomesDialogStatus = () => {
    return !(this.props.isFetching && this.props.incomesData.length)
  }

  getNoIncomesDialog = () => {
    const actions = [
      <FlatButton
        key={'cancel;'}
        label="Cancel"
        onClick={this.props.history.goBack}
        primary
      />,
      <FlatButton
        key={'newIncome'}
        keyboardFocused
        label="Add New Income"
        onClick={() => this.setState({createIncome: true})}
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
    return <Dialog
      modal={false}
      open={this.state.createIncome}
    >
      <IncomeForm/>
    </Dialog>
  }

  render () {
    return <IncomeWrapper>
      {this.getNoIncomesDialog()}
      {this.getCreateIncomeDialog()}
    </IncomeWrapper>
  }
}

Income.propTypes = {
  incomesData: PropTypes.array,
  isFetching: PropTypes.bool,
  getIncomes: PropTypes.func,
  history: PropTypes.object
}

function mapStateToProps (state) {
  const {
    incomeReducer: {
      incomesData,
      isFetching
    }
  } = state

  return { incomesData, isFetching }
}

export default connect(mapStateToProps, { getIncomes: createAction(INCOME.GET_ALL.REQUEST) })(Income)
