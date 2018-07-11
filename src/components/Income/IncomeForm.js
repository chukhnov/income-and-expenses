import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import * as Yup from 'yup'
import { Formik, Field } from 'formik'

import { INCOME } from '../../common/constants'
import { createAction } from '../../utils'
import FormikSelectField from './FormikSelectField'

const IncomeSchema = Yup.object().shape({
  amount: Yup.string().required('Required').min(1).max(5),
  description: Yup.string().required('Required')
})

class IncomeForm extends Component {
  state = {
  }

  render () {
    return <Formik
      initialValues={{
        amount: '',
        description: ''
      }}
      validationSchema={IncomeSchema}
      onSubmit={(values, actions) => {
        const { amount, description } = values
        const { date, category } = this.state

        actions.setSubmitting(false)
      }}
      render={props => {
        const inputFieldProps = {
          underlineFocusStyle: {display: 'none'},
          errorStyle: {
            color: '#ff000096'
          },
          underlineStyle: {
            borderColor: 'black'
          },
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

        return <form onSubmit={props.handleSubmit}>
          <div className='income-fields'>
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
          </div>
          <div className='submit-form-section'>
            <RaisedButton
              type='submit'
              label='Save'
              labelStyle={{fontWeight: 600}}
              style={{marginTop: '5%'}}/>
          </div>
        </form>
      }}
    />
  }
}

IncomeForm.propTypes = {
}

function mapStateToProps (state) {
  return { }
}

export default connect(mapStateToProps, { })(IncomeForm)
