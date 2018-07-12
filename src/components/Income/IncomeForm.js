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

import { INCOME } from '../../common/constants'
import { createAction } from '../../utils'
import FormikSelectField from './FormikSelectField'
import { FormWrapper } from './style'

const IncomeSchema = Yup.object().shape({
  amount: Yup.string().required('Required').min(1).max(5),
  description: Yup.string().required('Required')
})

class IncomeForm extends Component {
  state = {
    selectedCategory: null,
    selectedDate: new Date()
  }

  onFormSubmit = values => {
    const { selectedIncome, createIncome, editIncome, onCloseIncomeDialog } = this.props
    const { amount, description } = values
    const { selectedDate, selectedCategory } = this.state
    const data = {
      amount,
      description,
      date: selectedDate,
      categoryId: selectedCategory
    }

    onCloseIncomeDialog()

    if (selectedIncome) {
      editIncome({_id: selectedIncome._id, ...data})
    } else {
      createIncome({_id: shortid.generate(), ...data})
    }
  }

  render () {
    const { categoriesData } = this.props
    const { selectedCategory, selectedDate } = this.state
    return <Formik
      initialValues={{
        amount: '',
        description: ''
      }}
      validationSchema={IncomeSchema}
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
                style={{fontSize: '14px', width: '100%', marginRight: '5%'}}
              />
              <Field
                component={FormikSelectField}
                name="description"
                floatingLabelText="Description"
                {...inputFieldProps}
                style={{fontSize: '14px', width: '100%', marginRight: '5%'}}
              />
              <DatePicker
                onChange={this.handleChangeMaxDate}
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
                <RaisedButton type='submit' label='Save' primary={true}/>
              </div>
            </div>
          </form>
        </FormWrapper>
      }}
    />
  }
}

IncomeForm.propTypes = {
  categoriesData: PropTypes.array,
  selectedIncome: PropTypes.object,
  createIncome: PropTypes.func,
  editIncome: PropTypes.func,
  onCloseIncomeDialog: PropTypes.func
}

export default connect(null, {
  createIncome: createAction(INCOME.ADD.REQUEST),
  editIncome: createAction(INCOME.EDIT.REQUEST)
})(IncomeForm)
