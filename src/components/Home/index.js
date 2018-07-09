import React from 'react'
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
        <ListItem
          rightAvatar={<Avatar icon={<IncomeIcon />} backgroundColor={green400} />}
          primaryText="Income"
        />
        <Divider inset={true}/>
        <ListItem
          rightAvatar={<Avatar icon={<ExpenseIcon />} backgroundColor={red400} />}
          primaryText="Expense"
        />
        <Divider inset={true}/>
        <ListItem
          rightAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={yellow700} />}
          primaryText="Categories"
        />
        <Divider inset={true}/>
        <ListItem
          rightAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={blue400} />}
          primaryText="Statistic"
        />
      </List>
    </Paper>
  </HomeWrapper>
)

export default Home
