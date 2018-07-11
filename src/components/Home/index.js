import React from 'react'
import { Link } from 'react-router-dom'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
import { green400, red400, blue400, yellow700 } from 'material-ui/styles/colors'
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart'
import Paper from 'material-ui/Paper'
import IncomeIcon from 'material-ui/svg-icons/action/trending-up'
import ExpenseIcon from 'material-ui/svg-icons/action/trending-down'

import { HomeWrapper } from './style'

const Home = () => (
  <HomeWrapper>
    <Paper zDepth={5}>
      <List style={{width: '300px'}}>
        <Link to="/income">
          <ListItem
            primaryText="INCOME"
            rightAvatar={<Avatar icon={<IncomeIcon />}
              backgroundColor={green400} />}
          />
        </Link>
        <Divider inset />
        <Link to="/expense">
          <ListItem
            primaryText="EXPENSE"
            rightAvatar={<Avatar backgroundColor={red400} icon={<ExpenseIcon />} />}
          />
        </Link>
        <Divider inset />
        <Link to="/categories">
          <ListItem
            primaryText="CATEGORIES"
            rightAvatar={<Avatar backgroundColor={yellow700} icon={<ActionAssignment />} />}
          />
        </Link>
        <Divider inset />
        <Link to="/statistic">
          <ListItem
            primaryText="STATISTIC"
            rightAvatar={<Avatar icon={<EditorInsertChart />}
              backgroundColor={blue400} />}
          />
        </Link>
      </List>
    </Paper>
  </HomeWrapper>
)

export default Home
