import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// components
import Home from './components/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Profile from './components/profile/Profile'
import PropertyIndex from './components/properties/PropertyIndex'
import PropertyDetail from './components/properties/PropertyDetail'

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
        <Route path="/myprofile">
          <Profile />
        </Route>
        <Route exact path="/properties">
          <PropertyIndex />
        </Route>
        <Route path="/properties/:id">
          <PropertyDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
