import React from 'react'
import {PropTypes} from 'prop-types'

import { Roller } from './style'

const Loader = ({isFetching}) => {
  return isFetching ? <Roller>
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </Roller> : null
}

Loader.propTypes = {
  isFetching: PropTypes.bool
}

export default Loader
