
import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import HomePage from './Home'

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={HomePage}/>
      </Switch>
    </HashRouter>
  )
}