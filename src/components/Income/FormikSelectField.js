import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

const FormikSelectField = ({
  field: { name, value },
  form: { touched, errors, setFieldValue, setFieldTouched, isSubmitting },
  onChange,
  ...otherProps
}) => {
  const handleChange = (event) => {
    const { target: { value: newValue } } = event

    setFieldTouched(name, true)
    const expOld = value
    const expNew = newValue

    if (name === 'amount') {
      const regExp = /^[0-9]{0,5}$/

      if (expNew.match(regExp)) {
        return setFieldValue(name, expNew)
      } else {
        return setFieldValue(name, expOld)
      }
    }

    setFieldValue(name, newValue)
  }

  return (
    <TextField
      errorText={touched[name] && errors[name]}
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

FormikSelectField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  onChange: PropTypes.func
}

export default FormikSelectField
