
import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import HomePage from './Home'
import DetailPage from './Detail'

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/detail' component={DetailPage}/>
      </Switch>
    </HashRouter>
  )
}