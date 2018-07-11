import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { INCOME } from '../../common/constants'
import { createAction } from '../../utils'
import { IncomeWrapper } from './style'

class Income extends Component {
  state = {
    openNoIncomesDialog: false
  }
  componentWillMount () {
    this.props.getIncomes()
  }

  getNoIncomesDialog = () => {
    const actions = [
      <FlatButton
        key={'cancel;'}
        label="Cancel"
        onClick={this.handleClose}
        primary
      />,
      <FlatButton
        key={'newIncome'}
        keyboardFocused
        label="Add New Income"
        onClick={this.handleClose}
        primary
      />
    ]

    return <Dialog
      actions={actions}
      modal={false}
      open={this.state.openNoIncomesDialog}
      title="Dialog With Actions"
    >
          No Incomes were found. Do you want to add first?
    </Dialog>
  }

  render () {
    return (<IncomeWrapper>
      <h3>INCOME</h3>
      {this.getNoIncomesDialog()}
    </IncomeWrapper>)
  }
}

Income.propTypes = {
  incomesData: PropTypes.array,
  getIncomes: PropTypes.func
}

function mapStateToProps (state) {
  console.log(state)
  const {
    incomeReducer: incomesData
  } = state

  return { incomesData }
}

export default connect(mapStateToProps, { getIncomes: createAction(INCOME.GET_ALL.REQUEST) })(Income)
