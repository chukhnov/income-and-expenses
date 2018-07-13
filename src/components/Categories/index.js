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

import { CATEGORY } from '../../common/constants'
import { createAction } from '../../utils'
import { CategoryWrapper } from './style'
import CategoryForm from './CategoryForm'
import Loader from '../Loader/'

class Category extends Component {
  state = {
    openNoCategorysDialog: true,
    createCategory: false,
    selectedCategory: null
  }
  componentWillMount () {
    this.props.getCategories()
  }

  onCloseCategoryDialog = () => {
    this.setState({
      createCategory: false,
      selectedCategory: null
    })
  }

  noCategorysDialogStatus = () => {
    const {
      isFetching,
      categoriesData
    } = this.props
    return !isFetching && !categoriesData.length
  }

  getNoCategorysDialog = () => {
    const actions = [
      <Link key={'cancel'}
        to="/">
        <FlatButton
          label="Cancel"
          primary
        /></Link>,
      <FlatButton
        key={'newCategory'}
        keyboardFocused
        label="Add New Category"
        onClick={() => this.setState({createCategory: true, openNoCategorysDialog: false})}
        primary
      />
    ]

    return this.noCategorysDialogStatus() ? <Dialog
      actions={actions}
      modal={false}
      open={this.state.openNoCategorysDialog}
    >
          No Categorys were found. Do you want to add first?
    </Dialog> : null
  }

  getCreateCategoryDialog = () => {
    const { selectedCategory, createCategory } = this.state
    return <Dialog
      modal={false}
      open={createCategory}
    >
      <CategoryForm
        onCloseCategoryDialog={this.onCloseCategoryDialog}
        selectedCategory={selectedCategory}
      />
    </Dialog>
  }

  render () {
    const { isFetching, categoriesData } = this.props
    return <CategoryWrapper>
      {this.getNoCategorysDialog()}
      {this.getCreateCategoryDialog()}
      <Loader isFetching={isFetching}/>
      <div className='table-wrapper'>
        <AppBar
          title={<span>CATEGORY LIST</span>}
          titleStyle={{textAlign: 'center'}}
          iconElementLeft={<Link to="/"><RaisedButton
            label="Main menu"
            primary={true}
            icon={<GoBackIcon />}
          /></Link>}
          iconElementRight={<RaisedButton
            label="Add New Category"
            labelPosition="before"
            onClick={() => this.setState({createCategory: true})}
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
                <TableHeaderColumn>
                  <div className='right-aligned-data'><span>Actions</span></div>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {categoriesData.map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{row.value}</TableRowColumn>
                  <TableRowColumn>
                    <div className='right-aligned-data'>
                      <IconButton onClick={() => this.setState({ createCategory: true, selectedCategory: row })}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => this.props.deleteCategory(row._id)} iconStyle={{fill: 'red'}}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </CategoryWrapper>
  }
}

Category.propTypes = {
  categoriesData: PropTypes.array,
  isFetching: PropTypes.bool,
  getCategories: PropTypes.func,
  deleteCategory: PropTypes.func
}

function mapStateToProps (state) {
  const {
    categoryReducer: {
      categoriesData,
      isFetching
    }
  } = state

  return {
    categoriesData,
    isFetching
  }
}

export default connect(mapStateToProps, {
  deleteCategory: createAction(CATEGORY.DELETE.REQUEST),
  getCategories: createAction(CATEGORY.GET_ALL.REQUEST)
})(Category)
