import React from 'react'
import './App.scss'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import ProfileEdit from '@/pages/Edit'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Layout} />
          <Route path="/profile/edit" component={ProfileEdit} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
