
import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home/'
import Income from '../components/Income/'
// import Expense from '../components/Expense'
// import Categories from '../components/Categories'
// import NavBar from '../components/NavBar'
// import NoMatch from '../components/NoMatch'

const routes = (
  <div>
    {/* <NavBar /> */}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/income" component={Income} />
      {/* <Route path="/expense" component={Expense} /> */}
      {/* <Route path="/categories" component={Categories} /> */}
      {/* <Route component={NoMatch} /> */}
    </Switch>
  </div>
)

export default routes
