import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import * as Yup from 'yup'
import { Formik, Field } from 'formik'
import shortid from 'shortid'

import { EXPENSE } from '../../common/constants'
import { createAction } from '../../utils'
import FormikSelectField from './FormikSelectField'
import { FormWrapper } from './style'

const ExpenseSchema = Yup.object().shape({
  amount: Yup.string().required('Required').min(1).max(5),
  description: Yup.string().required('Required')
})

class ExpenseForm extends Component {
  state = {
    selectedCategory: null,
    selectedDate: new Date(),
    amount: '',
    description: ''
  }

  componentWillMount () {
    const { selectedExpense } = this.props
    if (selectedExpense) {
      const { date, categoryId, ...expenseData } = selectedExpense
      this.setState({
        ...expenseData,
        selectedDate: new Date(date),
        selectedCategory: categoryId
      })
    }
  }

  onFormSubmit = values => {
    const { selectedExpense, createExpense, editExpense, onCloseExpenseDialog } = this.props
    const { amount, description } = values
    const { selectedDate, selectedCategory } = this.state
    const data = {
      amount,
      description,
      date: selectedDate,
      categoryId: selectedCategory
    }

    onCloseExpenseDialog()

    if (selectedExpense) {
      editExpense({_id: selectedExpense._id, ...data})
    } else {
      createExpense({_id: shortid.generate(), ...data})
    }
  }

  render () {
    const { categoriesData } = this.props
    const { selectedCategory, selectedDate, amount, description } = this.state
    return <Formik
      initialValues={{ amount, description }}
      validationSchema={ExpenseSchema}
      onSubmit={this.onFormSubmit}
      render={props => {
        const inputFieldProps = {
          floatingLabelStyle: {
            color: '#0000008a',
            fontWeight: 400,
            fontSize: '14px'
          },
          floatingLabelFocusStyle: {
            color: 'black',
            fontWeight: 400
          }
        }

        return <FormWrapper>
          <form onSubmit={props.handleSubmit}>
            <div className='form-data'>
              <Field
                component={FormikSelectField}
                name="amount"
                floatingLabelText="Amount"
                {...inputFieldProps}
              />
              <Field
                component={FormikSelectField}
                name="description"
                floatingLabelText="Description"
                {...inputFieldProps}
              />
              <DatePicker
                onChange={(event, selectedDate) => this.setState({selectedDate})}
                autoOk={true}
                floatingLabelText="Date"
                defaultDate={selectedDate}
                textFieldStyle={{width: '100%'}}
                disableYearSelection={true}
              />
              <DropDownMenu value={selectedCategory} onChange={this.handleChange}>
                <MenuItem value={null} primaryText={'No Category'} />
                {categoriesData.map((el, index) => <MenuItem key={index} value={el._id} primaryText={el.value} />)}
              </DropDownMenu>
              <div className='submit-form-section'>
                <RaisedButton
                  onClick={this.props.onCloseExpenseDialog}
                  label='Cancel'/>
                <RaisedButton type='submit' label='Save' primary={true}/>
              </div>
            </div>
          </form>
        </FormWrapper>
      }}
    />
  }
}

ExpenseForm.propTypes = {
  categoriesData: PropTypes.array,
  selectedExpense: PropTypes.object,
  createExpense: PropTypes.func,
  editExpense: PropTypes.func,
  onCloseExpenseDialog: PropTypes.func
}

export default connect(null, {
  createExpense: createAction(EXPENSE.ADD.REQUEST),
  editExpense: createAction(EXPENSE.EDIT.REQUEST)
})(ExpenseForm)
