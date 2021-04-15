import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './auth/Login'
import Register from './auth/Register'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/getstarted">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
