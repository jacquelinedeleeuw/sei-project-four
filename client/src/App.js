import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// components
import Home from './components/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Profile from './components/profile/Profile'
import PropertyIndex from './components/properties/PropertyIndex'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/getstarted">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/myprofile">
          <Profile />
        </Route>
        <Route path="/properties">
          <PropertyIndex />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
