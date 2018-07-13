import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import * as Yup from 'yup'
import { Formik, Field } from 'formik'
import shortid from 'shortid'

import { CATEGORY } from '../../common/constants'
import { createAction } from '../../utils'
import FormikSelectField from '../FormikSelectField/'
import { FormWrapper } from './style'

const CategorySchema = Yup.object().shape({
  categoryName: Yup.string().required('Required')
})

class CategoryForm extends Component {
  state = {
    categoryName: ''
  }

  componentWillMount () {
    const { selectedCategory } = this.props
    selectedCategory && this.setState({ categoryName: selectedCategory.value })
  }

  onFormSubmit = values => {
    const { selectedCategory, createCategory, editCategory, onCloseCategoryDialog } = this.props

    onCloseCategoryDialog()

    if (selectedCategory) {
      editCategory({_id: selectedCategory._id, value: values.categoryName})
    } else {
      createCategory({_id: shortid.generate(), value: values.categoryName})
    }
  }

  render () {
    const { categoryName } = this.state
    return <Formik
      initialValues={{ categoryName }}
      validationSchema={CategorySchema}
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
                name="categoryName"
                floatingLabelText="Category Name"
                {...inputFieldProps}
              />
              <div className='submit-form-section'>
                <RaisedButton
                  onClick={this.props.onCloseCategoryDialog}
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

CategoryForm.propTypes = {
  selectedCategory: PropTypes.object,
  createCategory: PropTypes.func,
  editCategory: PropTypes.func,
  onCloseCategoryDialog: PropTypes.func
}

export default connect(null, {
  createCategory: createAction(CATEGORY.ADD.REQUEST),
  editCategory: createAction(CATEGORY.EDIT.REQUEST)
})(CategoryForm)
